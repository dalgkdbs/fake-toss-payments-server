import btoa from "btoa";
import toss from "../../api";
import { Configuration } from "../../Configuration";

export namespace TestConnection
{
    export const FAKE: toss.IConnection = {
        host: `http://127.0.0.1:${Configuration.API_PORT}`,
        headers: {
            "Authorization": `Basic ${btoa("test_ak_ZORzdMaqN3wQd5k6ygr5AkYXQGwy")}`,
        }
    };
    
    export const REAL: toss.IConnection = {
        host: `https://api.tosspayments.com/v1`,
        headers: {
            "Authorization": `Basic ${btoa("test_ak_ZORzdMaqN3wQd5k6ygr5AkYXQGwy")}`,
        }
    };
}