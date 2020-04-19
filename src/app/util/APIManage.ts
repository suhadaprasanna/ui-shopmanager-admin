import { HttpHeaders } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const APILink = Object.freeze({
    shopAPIURL: "http://localhost:8086/apishop",
    itemAPIURL: "http://localhost:8086/apiitem",
    personAPIURL: "http://localhost:8086/apiperson",
    authAPIURL: "http://localhost:8086/apiauth",
    authGetToken: "/oauth/token",
    authCheckToken: "/oauth/check_token",
    authRefreshToken: ""
});

export const AuthCredentials = Object.freeze({
    clientId: "gdcapishop",
    clientSecret: "gdcapishopsecret",
    grant_type:"password"
});

/**
 * 
 * @param arg content_type[json,form], 
 * arg.cache_control[no-cache,no-store,no-transform,only-if-cached]
 * arg.authorization [token,basic]
 */
export function getHeaders(arg) {
    let _headers = {}
    if(arg.content_type != undefined && arg.content_type != null && arg.content_type != ""){
        if(arg.content_type=="json"){
            _headers["Content-Type"] = "application/json";
        }else if(arg.content_type=="xml"){
            _headers["Content-Type"] = "application/xml";
        }else if(arg.content_type=="form"){
            _headers["Content-Type"] = "application/x-www-form-urlencoded";
        }else if(arg.content_type=="mpformdata"){
            _headers["Content-Type"] = "multipart/form-data";
        }
    }

    if(arg.accept != undefined && arg.accept != null && arg.accept != ""){
        if(arg.accept == "json"){
            _headers["accept"] = "application/json";
        }else if(arg.accept == "*"){
            _headers["accept"] = "*/*";
        }
    }

    if(arg.access_control_allow_origin != undefined && arg.access_control_allow_origin != null && arg.access_control_allow_origin != ""){
        _headers["Access-Control-Allow-Origin"] = arg.access_control_allow_origin;
    }

    if(arg.access_control_allow_headers != undefined && arg.access_control_allow_headers != null && arg.access_control_allow_headers != ""){
        _headers["Access-Control-Allow-Headers"] = arg.access_control_allow_headers;
    }

    if(arg.cache_control){
        _headers["Cache-Control"] = arg.cache_control;
    }

    if(arg.authorization){
        if(arg.authorization=="basic"){
            _headers["Authorization"] = 'Basic ' + btoa(AuthCredentials.clientId+':'+AuthCredentials.clientSecret);
        }else if(arg.authorization=="token"){
            const token: string = localStorage.getItem('token');
            const token_type: string = localStorage.getItem('token_type');
            if (token && token_type) {
                _headers["Authorization"] = token_type +' '+ token;
            }
        }
    }
    // if(isDevMode()){
    //     console.log(_headers);
    // }
    return {
        headers: new HttpHeaders(_headers)
    };
}