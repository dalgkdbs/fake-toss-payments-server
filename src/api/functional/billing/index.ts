/**
 * @packageDocumentation
 * @module api.functional.billing
 */
//================================================================
import { AesPkcs5 } from "./../../__internal/AesPkcs5";
import { Fetcher } from "./../../__internal/Fetcher";
import { Primitive } from "./../../Primitive";
import type { IConnection } from "./../../IConnection";

import type { ITossBilling } from "./../../structures/ITossBilling";
import type { ITossPayment } from "./../../structures/ITossPayment";

export * as authorizations from "./authorizations";

/**
 * 간편 결제에 등록한 수단으로 결제하기.
 * 
 * `billing.pay` 는 간편 결제에 등록한 수단으로 결제를 진행하고자 할 때 호출하는 API
 * 함수이다. 
 * 
 * 그리고 `billing.pay` 는 결제를 결제 수단 중 유일하게, 클라이언트 
 * 어플리케이션이 토스 페이먼츠가 제공하는 결제 창을 사용할 수 없어, 귀하의 백엔드 
 * 서버가 토스 페이먼츠의 API 함수를 직접 호출해야 하는 경우에 해당한다. 따라서 간편
 * 결제에 관련하여 토스 페이먼츠와 연동하는 백엔드 서버 및 프론트 어플리케이션을 개발할 
 * 때, 반드시 이 상황에 대한 별도의 설계 및 개발이 필요하니, 이 점을 염두에 두기 바란다.
 * 
 * 더하여 `billing.pay` 는 철저히 귀사 백엔드 서버의 판단 아래 호출되는 API 함수인지라,
 * 이를 통하여 이루어지는 결제는 일절 {@link  payments.approve } 가 필요 없다. 다만
 * `billing.pay` 는 이처럼 부차적인 승인 과정 필요없이 그 즉시로 결제가 완성되니, 이를
 * 호출하는 상황에 대하여 세심히 주의를 기울일 필요가 있다
 * 
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param billingKey 간편 결제에 등록한 수단의 {@link ITossBilling.billingKey}
 * @param input 주문 정보
 * @returns 결제 정보
 * 
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 * @controller FakeTossBillingController.pay()
 * @path POST /billing/:billingKey
 */
export function pay
    (
        connection: IConnection,
        billingKey: string,
        input: Primitive<pay.Input>
    ): Promise<pay.Output>
{
    return Fetcher.fetch
    (
        connection,
        pay.CONFIG,
        pay.METHOD,
        pay.path(billingKey),
        input
    );
}
export namespace pay
{
    export type Input = Primitive<ITossBilling.IPaymentStore>;
    export type Output = Primitive<ITossPayment>;


    export const METHOD = "POST";
    export const PATH = "/billing/:billingKey";
    export const CONFIG = {
        input_encrypted: false,
        output_encrypted: false,
    };

    export function path(billingKey: string): string
    {
        return `/billing/${billingKey}`;
    }
}



//---------------------------------------------------------
// TO PREVENT THE UNUSED VARIABLE ERROR
//---------------------------------------------------------
AesPkcs5;
Fetcher;
Primitive;
