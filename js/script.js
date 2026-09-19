"use strict";

/*
=========================================================
   LEITURA DA BÍBLIA EM 1 ANO
   MINISTÉRIO ATALAIA

   Arquivo:
   js/app.js

   Recursos:
   - IndexedDB
   - Progresso individual por leitura
   - Progresso mensal
   - Progresso anual
   - Marcar/desmarcar leitura
   - Marcar/desmarcar mês
   - Reiniciar progresso
   - Persistência mesmo após fechar o navegador
=========================================================
*/


/* =====================================================
   CONFIGURAÇÕES
===================================================== */

const CONFIG = {
    nomeBanco: "MinisterioAtalaiaLeituraBiblica",
    versaoBanco: 2,
    nomeStore: "leituras"
};

const MESES = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];


/*
=========================================================
   PLANO DE LEITURA

   Cada posição representa um dia.

   [Antigo Testamento, Novo Testamento]
=========================================================
*/

const planoLeitura = [

    /* =================================================
       JANEIRO
    ================================================= */

    [
        ["Gn 1-2", "Mt 1"],
        ["Gn 3-5", "Mt 2"],
        ["Gn 6-8", "Mt 3"],
        ["Gn 9-11", "Mt 4"],
        ["Gn 12-14", "Mt 5.1-20"],
        ["Gn 15-17", "Mt 5.21-48"],
        ["Gn 18-19", "Mt 6.1-18"],
        ["Gn 20-22", "Mt 6.19-7.6"],
        ["Gn 23-24", "Mt 7.7-29"],
        ["Gn 25-26", "Mt 8.1-27"],
        ["Gn 27-28", "Mt 8.28-9.17"],
        ["Gn 29-30", "Mt 9.18-38"],
        ["Gn 31-33", "Mt 10.1-23"],
        ["Gn 34-35", "Mt 10.24-42"],
        ["Gn 36-37", "Mt 11.1-30"],
        ["Gn 38-39", "Mt 12.1-21"],
        ["Gn 40-41", "Mt 12.22-50"],
        ["Gn 42-43", "Mt 13.1-23"],
        ["Gn 44-45", "Mt 13.24-43"],
        ["Gn 46-48", "Mt 13.44-14.12"],
        ["Gn 49-50", "Mt 14.13-36"],
        ["Êx 1-2", "Mt 15.1-28"],
        ["Êx 3-5", "Mt 15.29-16.12"],
        ["Êx 6-7", "Mt 16.13-17.13"],
        ["Êx 8-9", "Mt 17.14-18.14"],
        ["Êx 10-12", "Mt 18.15-35"],
        ["Êx 13-14", "Mt 19.1-15"],
        ["Êx 15", "Mt 19.16-20.16"],
        ["Êx 16-17", "Mt 20.17-34"],
        ["Êx 18-19", "Mt 21.1-32"],
        ["Êx 20-21", "Mt 21.33-22.14"]
    ],


    /* =================================================
       FEVEREIRO
    ================================================= */

    [
        ["Êx 22-23", "Mt 22.15-46"],
        ["Êx 24-25", "Mt 23"],
        ["Êx 26-27", "Mt 24.1-35"],
        ["Êx 28", "Mt 24.36-51"],
        ["Êx 29-30", "Mt 25.1-30"],
        ["Êx 31", "Mt 25.31-46"],
        ["Êx 32-33", "Mt 26.1-30"],
        ["Êx 34-35", "Mt 26.31-56"],
        ["Êx 36-37", "Mt 26.57-75"],
        ["Êx 38-39", "Mt 27.1-26"],
        ["Êx 40", "Mt 27.27-44"],
        ["Lv 1-3", "Mt 27.45-66"],
        ["Lv 4-5", "Mt 28"],
        ["Lv 6-7", "At 1"],
        ["Lv 8", "At 2.1-21"],
        ["Lv 9-10", "At 2.22-47"],
        ["Lv 11-12", "At 3"],
        ["Lv 13-14", "At 4.1-31"],
        ["Lv 15", "At 4.32-5.11"],
        ["Lv 16-18", "At 5.12-42"],
        ["Lv 19-21", "At 6"],
        ["Lv 22-23", "At 7.1-53"],
        ["Lv 24", "At 7.54-8.8"],
        ["Lv 25", "At 8.9-40"],
        ["Lv 26-27", "At 9.1-31"],
        ["Nm 1-2", "At 9.32-43"],
        ["Nm 3-4", "At 10.1-23"],
        ["Nm 5-6", "At 10.24-48"],
        ["Nm 7", "Hb 13"]
    ],


    /* =================================================
       MARÇO
    ================================================= */

    [
        ["Nm 7-8", "At 11.1-18"],
        ["Nm 9-10", "At 11.19-30"],
        ["Nm 11-13", "At 12"],
        ["Nm 14-15", "At 13.1-12"],
        ["Nm 16-17", "At 13.13-52"],
        ["Nm 18-19", "At 14"],
        ["Nm 20-21", "At 15.1-21"],
        ["Nm 22-23", "At 15.22-35"],
        ["Nm 24-26", "At 15.36-16.15"],
        ["Nm 27-28", "At 16.16-40"],
        ["Nm 29-31", "At 17.1-15"],
        ["Nm 32-33", "At 17.16-34"],
        ["Nm 34-36", "At 18.1-23"],
        ["Dt 1-2", "At 18.24-19.7"],
        ["Dt 3-4", "At 19.8-41"],
        ["Dt 5-7", "At 20.1-16"],
        ["Dt 8-10", "At 20.17-38"],
        ["Dt 11-12", "At 21.1-16"],
        ["Dt 13-15", "At 21.17-36"],
        ["Dt 16-17", "At 21.37-22.21"],
        ["Dt 18-21", "At 22.22-23.11"],
        ["Dt 22-24", "At 23.12-35"],
        ["Dt 25-27", "At 24"],
        ["Dt 28", "At 25.1-12"],
        ["Dt 29-30", "At 25.13-26.1"],
        ["Dt 31-32", "At 26.2-18"],
        ["Dt 33-34", "At 26.19-32"],
        ["Js 1-2", "At 27.1-26"],
        ["Js 3-4", "At 27.27-44"],
        ["Js 5-6", "At 28.1-16"]
    ],


    /* =================================================
       ABRIL
    ================================================= */

    [
        ["Js 10-12", "Mc 1.1-20"],
        ["Js 13-15", "Mc 1.21-45"],
        ["Js 16-19", "Mc 2.1-22"],
        ["Js 20-22", "Mc 2.23-3.12"],
        ["Js 23-24", "Mc 3.13-35"],
        ["Jz 1-2", "Mc 4.1-20"],
        ["Jz 3-4", "Mc 4.21-41"],
        ["Jz 5-6", "Mc 5.1-20"],
        ["Jz 7-8", "Mc 5.21-43"],
        ["Jz 9", "Mc 6.1-29"],
        ["Jz 10-11", "Mc 6.30-56"],
        ["Jz 12-13", "Mc 7.1-23"],
        ["Jz 14-16", "Mc 7.24-8.13"],
        ["Jz 17-18", "Mc 8.14-26"],
        ["Jz 19-21", "Mc 8.27-9.13"],
        ["Rt 1-4", "Mc 9.14-32"],
        ["1 Sm 1-2", "Mc 9.33-50"],
        ["1 Sm 3-7", "Mc 10.1-31"],
        ["1 Sm 8-10", "Mc 10.32-52"],
        ["1 Sm 11-13", "Mc 11.1-26"],
        ["1 Sm 14-15", "Mc 11.27-12.17"],
        ["1 Sm 16-17", "Mc 12.18-44"],
        ["1 Sm 18-19", "Mc 13"],
        ["1 Sm 20-22", "Mc 14.1-26"],
        ["1 Sm 23-25", "Mc 14.27-52"],
        ["1 Sm 26-28", "Mc 14.53-72"],
        ["1 Sm 29-31", "Mc 15.1-20"],
        ["2 Sm 1-3", "Mc 15.21-47"],
        ["2 Sm 4-6", "Mc 16"],
        ["2 Sm 7-8", "Jd 1-25"]
    ],


    /* =================================================
       MAIO
    ================================================= */

    [
        ["2 Sm 9-11", "1 Pe 1.1-21"],
        ["2 Sm 12-14", "1 Pe 1.22-2.25"],
        ["2 Sm 15-17", "1 Pe 3"],
        ["2 Sm 18-19", "1 Pe 4"],
        ["2 Sm 20-21", "1 Pe 5"],
        ["2 Sm 22", "2 Pe 1"],
        ["2 Sm 23-24", "2 Pe 2"],
        ["1 Rs 1", "2 Pe 3"],
        ["1 Rs 2-3", "Tg 1"],
        ["1 Rs 4", "Tg 2.1-3.13"],
        ["1 Rs 7-8", "Tg 3.14-4.12"],
        ["1 Rs 9", "Tg 4.13-5.20"],
        ["1 Rs 10-11", "Lc 1.1-25"],
        ["1 Rs 12-14", "Lc 1.26-56"],
        ["1 Rs 15-17", "Lc 1.57-80"],
        ["1 Rs 18-19", "Lc 2.1-20"],
        ["1 Rs 20-21", "Lc 2.21-52"],
        ["1 Rs 22", "Lc 3"],
        ["2 Rs 1-3", "Lc 4.1-13"],
        ["2 Rs 4-5", "Lc 4.14-44"],
        ["2 Rs 7-8", "Lc 5.1-16"],
        ["2 Rs 8-9", "Lc 5.17-39"],
        ["2 Rs 10-12", "Lc 6.1-16"],
        ["2 Rs 13-15", "Lc 6.17-49"],
        ["2 Rs 16-17", "Lc 7.1-35"],
        ["2 Rs 18-19", "Lc 7.36-50"],
        ["2 Rs 20-22", "Lc 8.1-21"],
        ["2 Rs 23-25", "Lc 8.22-39"],
        ["1 Cr 1-2", "Lc 8.40-56"],
        ["1 Cr 3-4", "Lc 9.1-17"],
        ["1 Cr 5-6", "Lc 9.18-36"]
    ],


    /* =================================================
       JUNHO
    ================================================= */

    [
        ["1 Cr 7-8", "Lc 9.37-62"],
        ["1 Cr 9-10", "Lc 10.1-24"],
        ["1 Cr 11-13", "Lc 10.25-42"],
        ["1 Cr 14-16", "Lc 11.1-13"],
        ["1 Cr 17-19", "Lc 11.14-36"],
        ["1 Cr 20-22", "Lc 11.37-54"],
        ["1 Cr 23-25", "Lc 12.1-21"],
        ["1 Cr 26-29", "Lc 12.22-48"],
        ["2 Cr 1-4", "Lc 12.49-59"],
        ["2 Cr 5-7", "Lc 13.1-21"],
        ["2 Cr 8-11", "Lc 13.22-35"],
        ["2 Cr 12-15", "Lc 14.1-24"],
        ["2 Cr 16-19", "Lc 14.25-15.10"],
        ["2 Cr 20-22", "Lc 15.11-32"],
        ["2 Cr 23-25", "Lc 16"],
        ["2 Cr 26-28", "Lc 17.1-19"],
        ["2 Cr 29-30", "Lc 17.20-18.14"],
        ["2 Cr 31-32", "Lc 18.15-43"],
        ["2 Cr 33-34", "Lc 19.1-27"],
        ["2 Cr 35-36", "Lc 19.28-48"],
        ["Ed 1-3", "Lc 20.1-19"],
        ["Ed 4-6", "Lc 20.20-21.4"],
        ["Ed 7-8", "Lc 21.5-38"],
        ["Ed 9-10", "Lc 22.1-38"],
        ["Ne 1-3", "Lc 22.39-65"],
        ["Ne 4-6", "Lc 22.66-23.25"],
        ["Ne 7-8", "Lc 23.26-49"],
        ["Ne 9-10", "Lc 23.50-24.12"],
        ["Ne 11-13", "Lc 24.13-35"],
        ["Et 1-4", "Lc 24.36-53"]
    ],


    /* =================================================
       JULHO
    ================================================= */

    [
        ["Et 5-7", "1 Ts 1.1-2.16"],
        ["Et 8-10", "1 Ts 2.17-3.13"],
        ["Jó 1-2", "1 Ts 4"],
        ["Jó 3-5", "1 Ts 5"],
        ["Jó 6-8", "2 Ts 1"],
        ["Jó 9-11", "2 Ts 2"],
        ["Jó 12-14", "2 Ts 3"],
        ["Jó 15-18", "1 Co 1"],
        ["Jó 19-21", "1 Co 2"],
        ["Jó 22-24", "1 Co 3"],
        ["Jó 25-28", "1 Co 4"],
        ["Jó 29-31", "1 Co 5"],
        ["Jó 32-35", "1 Co 6"],
        ["Jó 36-39", "1 Co 7"],
        ["Jó 40-42", "1 Co 8"],
        ["Sl 1-6", "1 Co 9"],
        ["Sl 7-10", "1 Co 10.1-13"],
        ["Sl 11-16", "1 Co 10.14-11.1"],
        ["Sl 17-18", "1 Co 11.2-34"],
        ["Sl 19-20", "1 Co 12"],
        ["Sl 21-22", "1 Co 13"],
        ["Sl 23-25", "1 Co 14"],
        ["Sl 26-29", "1 Co 15.1-34"],
        ["Sl 30-31", "1 Co 15.35-58"],
        ["Sl 32-34", "1 Co 16"],
        ["Sl 35-37", "2 Co 1.1-2.4"],
        ["Sl 38-41", "2 Co 2.5-3.6"],
        ["Sl 42-44", "2 Co 3.7-4.18"],
        ["Sl 45-48", "2 Co 5.1-6.2"],
        ["Sl 49-51", "2 Co 6.3-7.1"],
        ["Sl 52-55", "2 Co 7.2-16"]
    ],


    /* =================================================
       AGOSTO
    ================================================= */

    [
        ["Is 9-10", "Hb 5.11-6.20"],
        ["Is 11-12", "Hb 7"],
        ["Is 13-14", "Hb 8"],
        ["Is 15-18", "Hb 9.1-10"],
        ["Is 19-22", "Hb 9.11-28"],
        ["Is 23-24", "Hb 10.1-18"],
        ["Is 25-26", "Hb 10.19-39"],
        ["Is 27-28", "Hb 11.1-16"],
        ["Is 29-30", "Hb 11.17-40"],
        ["Is 31-32", "Hb 12.1-13"],
        ["Is 33-34", "Hb 12.14-29"],
        ["Is 35-37", "Hb 13"],
        ["Is 38-39", "Tt 1-2"],
        ["Is 40-41", "Tt 3"],
        ["Is 42-43", "1 Tm 1"],
        ["Is 44-45", "1 Tm 2"],
        ["Is 46-47", "1 Tm 3"],
        ["Is 48-49", "1 Tm 4"],
        ["Is 50-51", "1 Tm 5"],
        ["Is 52-53", "1 Tm 6"],
        ["Is 54-56", "2 Tm 1"],
        ["Is 57-58", "2 Tm 2"],
        ["Is 59-60", "2 Tm 3"],
        ["Is 61-63", "2 Tm 4"],
        ["Is 64-66", "Jo 1.1-18"],
        ["Mq 1-3", "Jo 1.19-51"],
        ["Mq 4-5", "Jo 2"],
        ["Mq 6-7", "Jo 3.1-21"],
        ["Na 1-3", "Jo 3.22-36"],
        ["Hc 1-3", "Jo 4.1-26"],
        ["Sf 1-3", "Jo 4.27-54"]
    ],


    /* =================================================
       SETEMBRO
    ================================================= */

    [
        ["Sl 56-59", "2 Co 8-9"],
        ["Sl 60-63", "2 Co 10"],
        ["Sl 64-67", "2 Co 11.1-15"],
        ["Sl 68-69", "2 Co 11.16-33"],
        ["Sl 70-73", "2 Co 12"],
        ["Sl 74-77", "2 Co 13"],
        ["Sl 78", "Rm 1.1-17"],
        ["Sl 79-81", "Rm 1.18-32"],
        ["Sl 82-84", "Rm 2"],
        ["Sl 85-88", "Rm 3"],
        ["Sl 89", "Rm 4"],
        ["Sl 90-93", "Rm 5.1-11"],
        ["Sl 94-98", "Rm 5.12-21"],
        ["Sl 99-101", "Rm 6.1-14"],
        ["Sl 102-103", "Rm 6.15-7.6"],
        ["Sl 104-106", "Rm 7.7-25"],
        ["Sl 107-108", "Rm 8.1-17"],
        ["Sl 109-112", "Rm 8.18-39"],
        ["Sl 113-116", "Rm 9.1-29"],
        ["Sl 117-118", "Rm 9.30-10.21"],
        ["Sl 119.1-112", "Rm 11.1-24"],
        ["Sl 119.113-176", "Rm 11.25-36"],
        ["Sl 120-127", "Rm 12.1-16"],
        ["Sl 128-134", "Rm 12.17-13.14"],
        ["Sl 135-138", "Rm 14.1-15.4"],
        ["Sl 139-141", "Rm 15.5-13"],
        ["Sl 142-145", "Rm 15.14-33"],
        ["Sl 146-150", "Rm 16"],
        ["Pv 1-2", "Gl 1"],
        ["Pv 3-4", "Gl 2"],
        ["Pv 5-7", "Gl 3.1-14"]
    ],


    /* =================================================
       OUTUBRO
    ================================================= */

    [
        ["Jr 1-2", "Jo 5.1-30"],
        ["Jr 3-4", "Jo 5.31-47"],
        ["Jr 5-6", "Jo 6.1-24"],
        ["Jr 7-8", "Jo 6.25-59"],
        ["Jr 9-10", "Jo 6.60-71"],
        ["Jr 11-12", "Jo 7.1-24"],
        ["Jr 13-14", "Jo 7.25-8.11"],
        ["Jr 15-16", "Jo 8.12-30"],
        ["Jr 17-18", "Jo 8.31-47"],
        ["Jr 19-22", "Jo 8.48-59"],
        ["Jr 23-25", "Jo 9"],
        ["Jr 26-28", "Jo 10.1-21"],
        ["Jr 29-30", "Jo 10.22-42"],
        ["Jr 31-32", "Jo 11.1-16"],
        ["Jr 33", "Jo 11.17-57"],
        ["Jr 34-35", "Jo 12.1-19"],
        ["Jr 36-37", "Jo 12.20-50"],
        ["Jr 38-40", "Jo 13.1-30"],
        ["Jr 41-43", "Jo 13.31-14.14"],
        ["Jr 44-47", "Jo 14.15-31"],
        ["Jr 48-49", "Jo 15.1-17"],
        ["Jr 50-51", "Jo 15.18-16.16"],
        ["Jr 52", "Jo 16.17-33"],
        ["Lm 1-2", "Jo 17"],
        ["Lm 3-5", "Jo 18.1-27"],
        ["Ez 1-2", "Jo 18.28-19.16"],
        ["Ez 3-4", "Jo 19.17-42"],
        ["Ez 5-7", "Jo 20.1-18"],
        ["Ez 8-10", "Jo 20.19-31"],
        ["Ez 11-12", "Jo 21"],
        ["Ez 13-15", "Pv 8-9"]
    ],


    /* =================================================
       NOVEMBRO
    ================================================= */

    [
        ["Pv 10-11", "Gl 3.15-25"],
        ["Pv 12-13", "Gl 3.26-4.20"],
        ["Pv 14-15", "Gl 4.21-5.15"],
        ["Pv 16-17", "Gl 5.16-26"],
        ["Pv 18-19", "Gl 6"],
        ["Pv 20-21", "Ef 1.1-14"],
        ["Pv 22-23", "Ef 1.15-2.10"],
        ["Pv 24-26", "Ef 2.11-22"],
        ["Pv 27-28", "Ef 3"],
        ["Pv 29-31", "Ef 4.1-16"],
        ["Ec 1-2", "Ef 4.17-5.2"],
        ["Ec 3-5", "Ef 5.3-21"],
        ["Ec 6-8", "Ef 5.22-6.9"],
        ["Ec 9-12", "Ef 6.10-24"],
        ["Ct 1-2", "Fp 1"],
        ["Ct 3-5", "Fp 2.1-18"],
        ["Ct 6-8", "Fp 2.19-3.11"],
        ["Ob 1-21", "Fp 3.12-4.3"],
        ["Jl 1-3", "Fp 4.4-23"],
        ["Am 1-4", "Cl 1.1-23"],
        ["Am 5-9", "Cl 1.24-2.5"],
        ["Os 1-2", "Cl 2.6-23"],
        ["Os 3-6", "Cl 3.1-4.1"],
        ["Os 7-10", "Cl 4.2-18"],
        ["Os 11-14", "Fm 1-25"],
        ["Is 1-2", "Hb 1"],
        ["Is 3-5", "Hb 2"],
        ["Is 6-8", "Hb 3"],
        ["Is 9-10", "Hb 4.1-13"],
        ["Is 11-12", "Hb 4.14-5.10"]
    ],


    /* =================================================
       DEZEMBRO
    ================================================= */

    [
        ["Ez 13-15", "1 Jo 1.1-2.14"],
        ["Ez 16", "1 Jo 2.15-3.10"],
        ["Ez 17-19", "1 Jo 3.11-24"],
        ["Ez 20-21", "1 Jo 4"],
        ["Ez 22-23", "1 Jo 5"],
        ["Ez 24-26", "2 Jo 1-13"],
        ["Ez 27-28", "3 Jo 1-15"],
        ["Ez 29-30", "Ap 1"],
        ["Ez 31-32", "Ap 2.1-17"],
        ["Ez 33-34", "Ap 2.18-3.6"],
        ["Ez 35-36", "Ap 3.7-22"],
        ["Ez 37-38", "Ap 4"],
        ["Ez 39-40", "Ap 5"],
        ["Ez 41-42", "Ap 6"],
        ["Ez 43-44", "Ap 7"],
        ["Ez 45-46", "Ap 8"],
        ["Ez 47-48", "Ap 9"],
        ["Dn 1-2", "Ap 10"],
        ["Dn 3-4", "Ap 11"],
        ["Dn 5-6", "Ap 12"],
        ["Dn 7-8", "Ap 13.1-10"],
        ["Dn 9-10", "Ap 13.11-14.20"],
        ["Dn 11-12", "Ap 15"],
        ["Ag 1-2", "Ap 16"],
        ["Zc 1-3", "Ap 17"],
        ["Zc 4-6", "Ap 18"],
        ["Zc 7-8", "Ap 19.1-10"],
        ["Zc 9-11", "Ap 19.11-21"],
        ["Zc 12-14", "Ap 20"],
        ["Ml 1-2", "Ap 21"],
        ["Ml 3-4", "Ap 22"]
    ]

];


/* =====================================================
   VARIÁVEIS
===================================================== */

let db = null;
let mesAtual = null;


/* =====================================================
   ELEMENTOS
===================================================== */

const areaLeituras =
    document.getElementById("area-leituras");

const tituloMes =
    document.getElementById("titulo-mes");

const resumoMes =
    document.getElementById("resumo-mes");

const containerLeituras =
    document.getElementById("leituras");

const botoesMes =
    document.querySelectorAll("[data-mes]");


/* =====================================================
   INDEXEDDB
===================================================== */

function abrirBanco() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(
            CONFIG.nomeBanco,
            CONFIG.versaoBanco
        );


        request.onupgradeneeded = event => {

            const bancoAtual =
                event.target.result;


            if (
                !bancoAtual.objectStoreNames.contains(
                    CONFIG.nomeStore
                )
            ) {

                bancoAtual.createObjectStore(
                    CONFIG.nomeStore,
                    {
                        keyPath: "id"
                    }
                );

            }

        };


        request.onsuccess = event => {

            db = event.target.result;

            resolve(db);

        };


        request.onerror = event => {

            reject(
                event.target.error
            );

        };

    });

}


/* =====================================================
   SALVAR LEITURA
===================================================== */

function salvarLeitura(
    id,
    concluida
) {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                CONFIG.nomeStore,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                CONFIG.nomeStore
            );


        store.put({
            id,
            concluida
        });


        transaction.oncomplete =
            () => resolve();


        transaction.onerror =
            event =>
                reject(
                    event.target.error
                );

    });

}


/* =====================================================
   OBTER UMA LEITURA
===================================================== */

function obterLeitura(id) {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                CONFIG.nomeStore,
                "readonly"
            );

        const store =
            transaction.objectStore(
                CONFIG.nomeStore
            );


        const request =
            store.get(id);


        request.onsuccess =
            () => resolve(
                request.result
            );


        request.onerror =
            event =>
                reject(
                    event.target.error
                );

    });

}


/* =====================================================
   OBTER TODAS AS LEITURAS
===================================================== */

function obterTodasAsLeituras() {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                CONFIG.nomeStore,
                "readonly"
            );

        const store =
            transaction.objectStore(
                CONFIG.nomeStore
            );


        const request =
            store.getAll();


        request.onsuccess =
            () => resolve(
                request.result
            );


        request.onerror =
            event =>
                reject(
                    event.target.error
                );

    });

}


/* =====================================================
   LIMPAR INDEXEDDB
===================================================== */

function limparBanco() {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                CONFIG.nomeStore,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                CONFIG.nomeStore
            );


        const request =
            store.clear();


        request.onsuccess =
            () => resolve();


        request.onerror =
            event =>
                reject(
                    event.target.error
                );

    });

}


/* =====================================================
   VERIFICAR SE LEITURA ESTÁ CONCLUÍDA
===================================================== */

async function leituraConcluida(id) {

    const registro =
        await obterLeitura(id);

    return (
        registro &&
        registro.concluida === true
    );

}


/* =====================================================
   ABRIR MÊS
===================================================== */

async function abrirMes(indice) {

    mesAtual = indice;

    const mes =
        planoLeitura[indice];

    areaLeituras.hidden = false;

    tituloMes.textContent =
        MESES[indice];

    containerLeituras.innerHTML = "";


    let concluidas = 0;


    for (
        let dia = 0;
        dia < mes.length;
        dia++
    ) {

        const leitura =
            mes[dia];

        const id =
            `${indice + 1}-${dia + 1}`;


        const concluida =
            await leituraConcluida(id);


        if (concluida) {

            concluidas++;

        }


        const artigo =
            document.createElement("article");

        artigo.className =
            "item-leitura";


        if (concluida) {

            artigo.classList.add(
                "leitura-concluida"
            );

        }


        const cabecalho =
            document.createElement("div");

        cabecalho.className =
            "cabecalho-dia";


        const titulo =
            document.createElement("h3");

        titulo.textContent =
            `Dia ${dia + 1}`;


        const checkbox =
            document.createElement("input");

        checkbox.type =
            "checkbox";

        checkbox.checked =
            concluida;

        checkbox.id =
            `leitura-${id}`;


        const label =
            document.createElement("label");

        label.htmlFor =
            checkbox.id;

        label.textContent =
            "Leitura concluída";


        checkbox.addEventListener(
            "change",
            async () => {

                await salvarLeitura(
                    id,
                    checkbox.checked
                );


                artigo.classList.toggle(
                    "leitura-concluida",
                    checkbox.checked
                );


                await atualizarProgresso();

            }
        );


        const leituraAT =
            document.createElement("p");

        leituraAT.innerHTML =
            `<strong>Antigo Testamento:</strong> ${leitura[0]}`;


        const leituraNT =
            document.createElement("p");

        leituraNT.innerHTML =
            `<strong>Novo Testamento:</strong> ${leitura[1]}`;


        const controle =
            document.createElement("div");

        controle.className =
            "controle-leitura";


        controle.appendChild(
            checkbox
        );

        controle.appendChild(
            label
        );


        cabecalho.appendChild(
            titulo
        );


        artigo.appendChild(
            cabecalho
        );

        artigo.appendChild(
            leituraAT
        );

        artigo.appendChild(
            leituraNT
        );

        artigo.appendChild(
            controle
        );


        containerLeituras.appendChild(
            artigo
        );

    }


    atualizarResumoMes(
        concluidas,
        mes.length
    );


    areaLeituras.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================================
   RESUMO DO MÊS
===================================================== */

function atualizarResumoMes(
    concluidas,
    total
) {

    const percentual =
        total === 0
            ? 0
            : Math.round(
                (concluidas / total) * 100
            );


    resumoMes.textContent =
        `${concluidas} de ${total} dias concluídos — ${percentual}%`;

}


/* =====================================================
   CALCULAR PROGRESSO DO MÊS
===================================================== */

async function calcularProgressoMes(
    indice,
    registros
) {

    const leituras =
        planoLeitura[indice];

    let concluidas = 0;


    leituras.forEach(
        (_, dia) => {

            const id =
                `${indice + 1}-${dia + 1}`;


            const registro =
                registros.find(
                    item =>
                        item.id === id
                );


            if (
                registro &&
                registro.concluida === true
            ) {

                concluidas++;

            }

        }
    );


    const total =
        leituras.length;


    const percentual =
        total === 0
            ? 0
            : Math.round(
                (concluidas / total) * 100
            );


    return {
        concluidas,
        total,
        percentual
    };

}


/* =====================================================
   CERTIFICADO DE CONCLUSÃO
===================================================== */

const ID_CERTIFICADO = "certificado-dados";

function formatarCPF(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function validarCPF(cpf) {
    const numeros = cpf.replace(/\D/g, "");
    if (numeros.length !== 11 || /^([0-9])\1{10}$/.test(numeros)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += Number(numeros[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== Number(numeros[9])) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += Number(numeros[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    return resto === Number(numeros[10]);
}

function gerarCodigoCertificado() {
    const ano = new Date().getFullYear();
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return `B365-${ano}-${String(array[0] % 1000000).padStart(6, "0")}`;
}

function salvarDadosCertificado(dados) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(CONFIG.nomeStore, "readwrite");
        const store = transaction.objectStore(CONFIG.nomeStore);
        store.put({ id: ID_CERTIFICADO, tipo: "certificado", ...dados });
        transaction.oncomplete = () => resolve();
        transaction.onerror = event => reject(event.target.error);
    });
}

async function obterDadosCertificado() {
    const registro = await obterLeitura(ID_CERTIFICADO);
    return registro && registro.tipo === "certificado" ? registro : null;
}

function atualizarEstadoCertificado(percentual) {
    const status = document.getElementById("certificado-status");
    const botao = document.getElementById("emitir-certificado");
    if (!status || !botao) return;
    if (percentual >= 100) {
        status.textContent = "🎉 Parabéns! Você concluiu os 365 dias. Preencha seu nome e CPF para emitir o certificado.";
        botao.disabled = false;
    } else {
        status.textContent = `Complete os 365 dias de leitura para liberar a emissão do certificado. Progresso atual: ${percentual}%.`;
        botao.disabled = true;
    }
}

function preencherCertificado(dados) {
    document.getElementById("certificado-nome").textContent = dados.nome;
    document.getElementById("certificado-cpf").textContent = dados.cpf;
    document.getElementById("certificado-data").textContent = dados.data;
    document.getElementById("certificado-codigo").textContent = `Código de emissão: ${dados.codigo}`;
    document.getElementById("certificado-impressao").hidden = false;
    document.getElementById("imprimir-certificado").hidden = false;
}

async function carregarCertificado(percentual) {
    atualizarEstadoCertificado(percentual);
    const dados = await obterDadosCertificado();
    if (dados && percentual >= 100) {
        const nome = document.getElementById("nome-certificado");
        const cpf = document.getElementById("cpf-certificado");
        if (nome) nome.value = dados.nome;
        if (cpf) cpf.value = dados.cpf;
        preencherCertificado(dados);
    }
}

async function emitirCertificado() {
    const nome = document.getElementById("nome-certificado").value.trim();
    const cpf = formatarCPF(document.getElementById("cpf-certificado").value);
    if (nome.length < 3) {
        alert("Digite seu nome completo.");
        return;
    }
    if (!validarCPF(cpf)) {
        alert("Digite um CPF válido.");
        return;
    }
    const anterior = await obterDadosCertificado();
    const dados = {
        nome,
        cpf,
        data: anterior?.data || new Date().toLocaleDateString("pt-BR"),
        codigo: anterior?.codigo || gerarCodigoCertificado()
    };
    await salvarDadosCertificado(dados);
    preencherCertificado(dados);
    alert("Certificado emitido com sucesso!");
}

function configurarCertificado() {
    const cpf = document.getElementById("cpf-certificado");
    const emitir = document.getElementById("emitir-certificado");
    const imprimir = document.getElementById("imprimir-certificado");
    if (cpf) cpf.addEventListener("input", () => { cpf.value = formatarCPF(cpf.value); });
    if (emitir) emitir.addEventListener("click", emitirCertificado);
    if (imprimir) imprimir.addEventListener("click", () => window.print());
}

/* =====================================================
   ATUALIZAR TODO O PROGRESSO
===================================================== */

async function atualizarProgresso() {

    const registros =
        await obterTodasAsLeituras();


    let totalDias = 0;
    let diasConcluidos = 0;


    for (
        let mes = 0;
        mes < planoLeitura.length;
        mes++
    ) {

        const progresso =
            await calcularProgressoMes(
                mes,
                registros
            );


        totalDias +=
            progresso.total;


        diasConcluidos +=
            progresso.concluidas;


        const barra =
            document.getElementById(
                `progresso-mes-${mes}`
            );


        const porcentagem =
            document.getElementById(
                `porcentagem-mes-${mes}`
            );


        if (barra) {

            barra.value =
                progresso.percentual;

        }


        if (porcentagem) {

            porcentagem.textContent =
                `${progresso.percentual}%`;

        }

    }


    const percentualGeral =
        totalDias === 0
            ? 0
            : Math.round(
                (diasConcluidos / totalDias) * 100
            );


    const barraGeral =
        document.getElementById(
            "progresso-geral-barra"
        );


    const textoGeral =
        document.getElementById(
            "porcentagem-geral"
        );


    const diasTexto =
        document.getElementById(
            "dias-concluidos"
        );


    const totalTexto =
        document.getElementById(
            "total-dias"
        );


    if (barraGeral) {

        barraGeral.value =
            percentualGeral;

    }


    if (textoGeral) {

        textoGeral.textContent =
            `${percentualGeral}%`;

    }


    if (diasTexto) {

        diasTexto.textContent =
            diasConcluidos;

    }


    if (totalTexto) {

        totalTexto.textContent =
            totalDias;

    }

    await carregarCertificado(percentualGeral);


    /*
     * Se um mês estiver aberto,
     * atualiza também seu resumo.
     */

    if (mesAtual !== null) {

        const progressoMes =
            await calcularProgressoMes(
                mesAtual,
                registros
            );


        atualizarResumoMes(
            progressoMes.concluidas,
            progressoMes.total
        );

    }

}


/* =====================================================
   MARCAR MÊS COMO CONCLUÍDO
===================================================== */

async function marcarMes() {

    if (mesAtual === null) {

        return;

    }


    const mes =
        planoLeitura[mesAtual];


    for (
        let dia = 0;
        dia < mes.length;
        dia++
    ) {

        const id =
            `${mesAtual + 1}-${dia + 1}`;


        await salvarLeitura(
            id,
            true
        );

    }


    await abrirMes(
        mesAtual
    );


    await atualizarProgresso();

}


/* =====================================================
   DESMARCAR MÊS
===================================================== */

async function desmarcarMes() {

    if (mesAtual === null) {

        return;

    }


    const mes =
        planoLeitura[mesAtual];


    for (
        let dia = 0;
        dia < mes.length;
        dia++
    ) {

        const id =
            `${mesAtual + 1}-${dia + 1}`;


        await salvarLeitura(
            id,
            false
        );

    }


    await abrirMes(
        mesAtual
    );


    await atualizarProgresso();

}


/* =====================================================
   REINICIAR TODO O PROGRESSO
===================================================== */

async function reiniciarProgresso() {

    const confirmar =
        window.confirm(
            "Deseja realmente apagar todo o progresso da leitura?"
        );


    if (!confirmar) {

        return;

    }


    await limparBanco();


    await atualizarProgresso();


    if (mesAtual !== null) {

        await abrirMes(
            mesAtual
        );

    }


    alert(
        "Todo o progresso foi reiniciado."
    );

}


/* =====================================================
   EVENTOS DOS MESES
===================================================== */

botoesMes.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                const indice =
                    Number(
                        botao.dataset.mes
                    );


                abrirMes(
                    indice
                );

            }
        );

    }
);


/* =====================================================
   EVENTOS DOS CONTROLES
===================================================== */

const botaoMarcarMes =
    document.getElementById(
        "marcar-mes"
    );


if (botaoMarcarMes) {

    botaoMarcarMes.addEventListener(
        "click",
        marcarMes
    );

}


const botaoDesmarcarMes =
    document.getElementById(
        "desmarcar-mes"
    );


if (botaoDesmarcarMes) {

    botaoDesmarcarMes.addEventListener(
        "click",
        desmarcarMes
    );

}


const botaoLimpar =
    document.getElementById(
        "limpar-progresso"
    );


if (botaoLimpar) {

    botaoLimpar.addEventListener(
        "click",
        reiniciarProgresso
    );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

configurarCertificado();

async function iniciarAplicacao() {

    try {

        await abrirBanco();

        await atualizarProgresso();

        console.log(
            "Aplicativo de leitura iniciado."
        );

        console.log(
            "IndexedDB conectado:",
            CONFIG.nomeBanco
        );

    } catch (erro) {

        console.error(
            "Erro ao iniciar o aplicativo:",
            erro
        );


        alert(
            "Não foi possível iniciar o armazenamento do aplicativo."
        );

    }

}


iniciarAplicacao();