import express from "express";
import * as helper from "encrypted-nestjs";
import * as nest from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { Configuration } from "./Configuration";

/**
 * Fake 토스 페이먼츠 서버의 백엔드 프로그램.
 * 
 * @author Samchon
 */
export class Backend
{
    private application_?: nest.INestApplication;
    private is_closing_: boolean = false;

    /**
     * 서버 개설.
     */
    public async open(): Promise<void>
    {
        //----
        // OPEN THE BACKEND SERVER
        //----
        // MOUNT CONTROLLERS
        this.application_ = await NestFactory.create
        (
            await helper.EncryptedModule.dynamic
            (
                __dirname + "/controllers", 
                Configuration.ENCRYPTION_PASSWORD
            ),
            { logger: false }
        );
        
        // CONFIGURATIONS
        this.is_closing_ = false;
        this.application_.enableCors();
        this.application_.use(this.middleware.bind(this));

        // DO OPEN
        await this.application_.listen(Configuration.API_PORT);

        //----
        // POST-PROCESSES
        //----
        // INFORM TO THE PM2
        if (process.send)
            process.send("ready");

        // WHEN KILL COMMAND COMES
        process.on("SIGINT", async () =>
        {
            this.is_closing_ = true;
            await this.close();
            process.exit(0);
        });
    }

    /**
     * 서버 폐쇄.
     */
    public async close(): Promise<void>
    {
        if (this.application_ === undefined)
            return;

        // DO CLOSE
        await this.application_.close();
        delete this.application_;
    }

    private middleware
        (
            _request: express.Request, 
            response: express.Response, 
            next: Function
        ): void
    {
        if (this.is_closing_ === true)
            response.set("Connection", "close");
        next();
    }
}