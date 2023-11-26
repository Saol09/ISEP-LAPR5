% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).

%:- use_module(library(http/http_unix_daemon)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_cors)).
:- use_module(library(date)).
:- use_module(library(random)).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

:- json_object agenda_maq_json_array(array:list(agenda_maq_json)).
:- json_object agenda_maq_json(maquina:string,agenda_array:list(agenda_json)).
:- json_object agenda_json(instanteInicial:float,instanteFinal:float,tipoProcessamento:string,lista:list(string)).

% Funções do Servidor
:- set_setting(http:cors, [*]).


% -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------.

%cidadeArmazem(<codigo>).
cidadeArmazem("005").

%dadosCam_t_e_ta(<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
dadosCam_t_e_ta("001","002",122,42,0).
dadosCam_t_e_ta("001","003",122,46,0).
dadosCam_t_e_ta("001","004",151,54,25).
dadosCam_t_e_ta("001","005",147,52,25).
dadosCam_t_e_ta("001","006",74,24,0).
dadosCam_t_e_ta("001","007",116,35,0).
dadosCam_t_e_ta("001","008",141,46,0).
dadosCam_t_e_ta("001","009",185,74,53).
dadosCam_t_e_ta("001","010",97,30,0).
dadosCam_t_e_ta("001","011",164,64,40).
dadosCam_t_e_ta("001","012",76,23,0).
dadosCam_t_e_ta("001","013",174,66,45).
dadosCam_t_e_ta("001","014",59,18,0).
dadosCam_t_e_ta("001","015",132,51,24).
dadosCam_t_e_ta("001","016",181,68,45).
dadosCam_t_e_ta("001","017",128,45,0).

dadosCam_t_e_ta("002","001",116,42,0).
dadosCam_t_e_ta("002","003",55,22,0).
dadosCam_t_e_ta("002","004",74,25,0).
dadosCam_t_e_ta("002","005",65,22,0).
dadosCam_t_e_ta("002","006",69,27,0).
dadosCam_t_e_ta("002","007",74,38,0).
dadosCam_t_e_ta("002","008",61,18,0).
dadosCam_t_e_ta("002","009",103,44,0).
dadosCam_t_e_ta("002","010",36,14,0).
dadosCam_t_e_ta("002","011",88,41,0).
dadosCam_t_e_ta("002","012",61,19,0).
dadosCam_t_e_ta("002","013",95,42,0).
dadosCam_t_e_ta("002","014",78,34,0).
dadosCam_t_e_ta("002","015",69,30,0).
dadosCam_t_e_ta("002","016",99,38,0).
dadosCam_t_e_ta("002","017",46,14,0).

dadosCam_t_e_ta("003","001",120,45,0).
dadosCam_t_e_ta("003","002",50,22,0).
dadosCam_t_e_ta("003","004",46,15,0).
dadosCam_t_e_ta("003","005",46,14,0).
dadosCam_t_e_ta("003","006",74,37,0).
dadosCam_t_e_ta("003","007",63,23,0).
dadosCam_t_e_ta("003","008",38,8,0).
dadosCam_t_e_ta("003","009",84,36,0).
dadosCam_t_e_ta("003","010",59,28,0).
dadosCam_t_e_ta("003","011",61,27,0).
dadosCam_t_e_ta("003","012",67,32,0).
dadosCam_t_e_ta("003","013",67,29,0).
dadosCam_t_e_ta("003","014",82,38,0).
dadosCam_t_e_ta("003","015",34,8,0).
dadosCam_t_e_ta("003","016",80,30,0).
dadosCam_t_e_ta("003","017",36,10,0).

dadosCam_t_e_ta("004","001",149,54,25).
dadosCam_t_e_ta("004","002",65,24,0).
dadosCam_t_e_ta("004","003",46,16,0).
dadosCam_t_e_ta("004","005",27,10,0).
dadosCam_t_e_ta("004","006",103,47,0).
dadosCam_t_e_ta("004","007",55,27,0).
dadosCam_t_e_ta("004","008",36,10,0).
dadosCam_t_e_ta("004","009",50,26,0).
dadosCam_t_e_ta("004","010",78,34,0).
dadosCam_t_e_ta("004","011",42,19,0).
dadosCam_t_e_ta("004","012",97,42,0).
dadosCam_t_e_ta("004","013",44,11,0).
dadosCam_t_e_ta("004","014",111,48,0).
dadosCam_t_e_ta("004","015",32,13,0).
dadosCam_t_e_ta("004","016",53,14,0).
dadosCam_t_e_ta("004","017",38,11,0).

dadosCam_t_e_ta("005","001",141,51,24).
dadosCam_t_e_ta("005","002",55,20,0).
dadosCam_t_e_ta("005","003",48,14,0).
dadosCam_t_e_ta("005","004",25,9,0).
dadosCam_t_e_ta("005","006",97,44,0).
dadosCam_t_e_ta("005","007",55,28,0).
dadosCam_t_e_ta("005","008",29,7,0).
dadosCam_t_e_ta("005","009",48,24,0).
dadosCam_t_e_ta("005","010",69,30,0).
dadosCam_t_e_ta("005","011",53,26,0).
dadosCam_t_e_ta("005","012",95,36,0).
dadosCam_t_e_ta("005","013",63,20,0).
dadosCam_t_e_ta("005","014",105,45,0).
dadosCam_t_e_ta("005","015",34,14,0).
dadosCam_t_e_ta("005","016",46,18,0).
dadosCam_t_e_ta("005","017",27,7,0).

dadosCam_t_e_ta("006","001",69,23,0).
dadosCam_t_e_ta("006","002",71,27,0).
dadosCam_t_e_ta("006","003",74,38,0).
dadosCam_t_e_ta("006","004",103,46,0).
dadosCam_t_e_ta("006","005",99,44,0).
dadosCam_t_e_ta("006","007",88,48,0).
dadosCam_t_e_ta("006","008",92,38,0).
dadosCam_t_e_ta("006","009",134,66,45).
dadosCam_t_e_ta("006","010",42,14,0).
dadosCam_t_e_ta("006","011",116,56,30).
dadosCam_t_e_ta("006","012",23,9,0).
dadosCam_t_e_ta("006","013",126,58,33).
dadosCam_t_e_ta("006","014",25,9,0).
dadosCam_t_e_ta("006","015",84,44,0).
dadosCam_t_e_ta("006","016",132,60,35).
dadosCam_t_e_ta("006","017",80,38,0).

dadosCam_t_e_ta("007","001",116,36,0).
dadosCam_t_e_ta("007","002",71,38,0).
dadosCam_t_e_ta("007","003",61,22,0).
dadosCam_t_e_ta("007","004",53,26,0).
dadosCam_t_e_ta("007","005",53,28,0).
dadosCam_t_e_ta("007","006",88,48,0).
dadosCam_t_e_ta("007","008",59,26,0).
dadosCam_t_e_ta("007","009",88,48,0).
dadosCam_t_e_ta("007","010",84,44,0).
dadosCam_t_e_ta("007","011",74,22,0).
dadosCam_t_e_ta("007","012",82,42,0).
dadosCam_t_e_ta("007","013",76,31,0).
dadosCam_t_e_ta("007","014",97,49,21).
dadosCam_t_e_ta("007","015",29,16,0).
dadosCam_t_e_ta("007","016",84,42,0).
dadosCam_t_e_ta("007","017",69,30,0).

dadosCam_t_e_ta("008","001",134,46,0).
dadosCam_t_e_ta("008","002",59,18,0).
dadosCam_t_e_ta("008","003",32,6,0).
dadosCam_t_e_ta("008","004",34,10,0).
dadosCam_t_e_ta("008","005",32,7,0).
dadosCam_t_e_ta("008","006",88,38,0).
dadosCam_t_e_ta("008","007",57,26,0).
dadosCam_t_e_ta("008","009",69,30,0).
dadosCam_t_e_ta("008","010",65,26,0).
dadosCam_t_e_ta("008","011",53,22,0).
dadosCam_t_e_ta("008","012",82,34,0).
dadosCam_t_e_ta("008","013",61,24,0).
dadosCam_t_e_ta("008","014",97,40,0).
dadosCam_t_e_ta("008","015",36,12,0).
dadosCam_t_e_ta("008","016",65,23,0).
dadosCam_t_e_ta("008","017",32,6,0).

dadosCam_t_e_ta("009","001",181,72,50).
dadosCam_t_e_ta("009","002",95,41,0).
dadosCam_t_e_ta("009","003",86,35,0).
dadosCam_t_e_ta("009","004",55,24,0).
dadosCam_t_e_ta("009","005",48,23,0).
dadosCam_t_e_ta("009","006",134,65,42).
dadosCam_t_e_ta("009","007",95,47,0).
dadosCam_t_e_ta("009","008",69,28,0).
dadosCam_t_e_ta("009","010",109,51,24).
dadosCam_t_e_ta("009","011",61,29,0).
dadosCam_t_e_ta("009","012",132,57,31).
dadosCam_t_e_ta("009","013",67,19,0).
dadosCam_t_e_ta("009","014",143,66,45).
dadosCam_t_e_ta("009","015",71,34,0).
dadosCam_t_e_ta("009","016",15,3,0).
dadosCam_t_e_ta("009","017",67,28,0).

dadosCam_t_e_ta("010","001",97,30,0).
dadosCam_t_e_ta("010","002",34,14,0).
dadosCam_t_e_ta("010","003",59,27,0).
dadosCam_t_e_ta("010","004",78,33,0).
dadosCam_t_e_ta("010","005",71,30,0).
dadosCam_t_e_ta("010","006",40,14,0).
dadosCam_t_e_ta("010","007",82,42,0).
dadosCam_t_e_ta("010","008",65,24,0).
dadosCam_t_e_ta("010","009",109,52,25).
dadosCam_t_e_ta("010","011",92,46,0).
dadosCam_t_e_ta("010","012",32,6,0).
dadosCam_t_e_ta("010","013",99,46,0).
dadosCam_t_e_ta("010","014",63,17,0).
dadosCam_t_e_ta("010","015",74,34,0).
dadosCam_t_e_ta("010","016",105,46,0).
dadosCam_t_e_ta("010","017",53,23,0).

dadosCam_t_e_ta("011","001",164,65,42).
dadosCam_t_e_ta("011","002",88,41,0).
dadosCam_t_e_ta("011","003",65,28,0).
dadosCam_t_e_ta("011","004",42,18,0).
dadosCam_t_e_ta("011","005",55,25,0).
dadosCam_t_e_ta("011","006",118,57,31).
dadosCam_t_e_ta("011","007",74,23,0).
dadosCam_t_e_ta("011","008",59,23,0).
dadosCam_t_e_ta("011","009",63,28,0).
dadosCam_t_e_ta("011","010",97,46,0).
dadosCam_t_e_ta("011","012",111,52,25).
dadosCam_t_e_ta("011","013",25,7,0).
dadosCam_t_e_ta("011","014",126,58,33).
dadosCam_t_e_ta("011","015",53,25,0).
dadosCam_t_e_ta("011","016",59,27,0).
dadosCam_t_e_ta("011","017",67,27,0).

dadosCam_t_e_ta("012","001",76,23,0).
dadosCam_t_e_ta("012","002",61,19,0).
dadosCam_t_e_ta("012","003",67,32,0).
dadosCam_t_e_ta("012","004",97,41,0).
dadosCam_t_e_ta("012","005",92,38,0).
dadosCam_t_e_ta("012","006",19,8,0).
dadosCam_t_e_ta("012","007",82,42,0).
dadosCam_t_e_ta("012","008",86,33,0).
dadosCam_t_e_ta("012","009",128,61,37).
dadosCam_t_e_ta("012","010",32,6,0).
dadosCam_t_e_ta("012","011",109,50,23).
dadosCam_t_e_ta("012","013",120,53,26).
dadosCam_t_e_ta("012","014",40,10,0).
dadosCam_t_e_ta("012","015",78,38,0).
dadosCam_t_e_ta("012","016",126,54,28).
dadosCam_t_e_ta("012","017",74,32,0).

dadosCam_t_e_ta("013","001",174,65,42).
dadosCam_t_e_ta("013","002",107,35,0).
dadosCam_t_e_ta("013","003",74,29,0).
dadosCam_t_e_ta("013","004",46,11,0).
dadosCam_t_e_ta("013","005",67,20,0).
dadosCam_t_e_ta("013","006",128,57,31).
dadosCam_t_e_ta("013","007",80,30,0).
dadosCam_t_e_ta("013","008",76,20,0).
dadosCam_t_e_ta("013","009",67,20,0).
dadosCam_t_e_ta("013","010",105,47,0).
dadosCam_t_e_ta("013","011",27,7,0).
dadosCam_t_e_ta("013","012",122,52,25).
dadosCam_t_e_ta("013","014",137,58,33).
dadosCam_t_e_ta("013","015",67,17,0).
dadosCam_t_e_ta("013","016",59,15,0).
dadosCam_t_e_ta("013","017",78,22,0).

dadosCam_t_e_ta("014","001",59,18,0).
dadosCam_t_e_ta("014","002",80,35,0).
dadosCam_t_e_ta("014","003",80,38,0).
dadosCam_t_e_ta("014","004",109,46,0).
dadosCam_t_e_ta("014","005",105,45,0).
dadosCam_t_e_ta("014","006",27,9,0).
dadosCam_t_e_ta("014","007",97,48,0).
dadosCam_t_e_ta("014","008",99,38,0).
dadosCam_t_e_ta("014","009",143,66,45).
dadosCam_t_e_ta("014","010",61,17,0).
dadosCam_t_e_ta("014","011",122,57,31).
dadosCam_t_e_ta("014","012",42,10,0).
dadosCam_t_e_ta("014","013",132,58,35).
dadosCam_t_e_ta("014","015",90,44,0).
dadosCam_t_e_ta("014","016",139,61,37).
dadosCam_t_e_ta("014","017",86,38,0).

dadosCam_t_e_ta("015","001",132,51,24).
dadosCam_t_e_ta("015","002",74,30,0).
dadosCam_t_e_ta("015","003",34,8,0).
dadosCam_t_e_ta("015","004",36,12,0).
dadosCam_t_e_ta("015","005",36,14,0).
dadosCam_t_e_ta("015","006",86,44,0).
dadosCam_t_e_ta("015","007",34,16,0).
dadosCam_t_e_ta("015","008",42,13,0).
dadosCam_t_e_ta("015","009",71,35,0).
dadosCam_t_e_ta("015","010",82,36,0).
dadosCam_t_e_ta("015","011",53,25,0).
dadosCam_t_e_ta("015","012",80,38,0).
dadosCam_t_e_ta("015","013",69,18,0).
dadosCam_t_e_ta("015","014",95,45,0).
dadosCam_t_e_ta("015","016",69,29,0).
dadosCam_t_e_ta("015","017",53,17,0).

dadosCam_t_e_ta("016","001",179,68,45).
dadosCam_t_e_ta("016","002",92,37,0).
dadosCam_t_e_ta("016","003",84,31,0).
dadosCam_t_e_ta("016","004",57,16,0).
dadosCam_t_e_ta("016","005",46,18,0).
dadosCam_t_e_ta("016","006",132,60,35).
dadosCam_t_e_ta("016","007",92,42,0).
dadosCam_t_e_ta("016","008",67,23,0).
dadosCam_t_e_ta("016","009",15,3,0).
dadosCam_t_e_ta("016","010",105,46,0).
dadosCam_t_e_ta("016","011",57,28,0).
dadosCam_t_e_ta("016","012",130,52,25).
dadosCam_t_e_ta("016","013",61,15,0).
dadosCam_t_e_ta("016","014",141,61,37).
dadosCam_t_e_ta("016","015",69,29,0).
dadosCam_t_e_ta("016","017",65,24,0).

dadosCam_t_e_ta("017","001",128,46,0).
dadosCam_t_e_ta("017","002",42,14,0).
dadosCam_t_e_ta("017","003",40,11,0).
dadosCam_t_e_ta("017","004",42,13,0).
dadosCam_t_e_ta("017","005",34,10,0).
dadosCam_t_e_ta("017","006",82,38,0).
dadosCam_t_e_ta("017","007",74,30,0).
dadosCam_t_e_ta("017","008",29,6,0).
dadosCam_t_e_ta("017","009",69,31,0).
dadosCam_t_e_ta("017","010",55,24,0).
dadosCam_t_e_ta("017","011",69,29,0).
dadosCam_t_e_ta("017","012",80,30,0).
dadosCam_t_e_ta("017","013",82,23,0).
dadosCam_t_e_ta("017","014",90,38,0).
dadosCam_t_e_ta("017","015",53,18,0).
dadosCam_t_e_ta("017","016",67,25,0).

% -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------.

:- dynamic idArmazem/2.
:- dynamic carateristicasCam/6.
:- dynamic entrega/6.

% ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------.
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    importarInformacao().

stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).

:- initialization(startServer(5050)).

% -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------.

importarInformacao():-
    adicionarArmazens(),
    adicionarCamioes(),
    adicionarEntregas().

adicionarArmazens():-
	http_open('https://localhost:5001/api/Armazens', ResultJSON, []),
	json_read_dict(ResultJSON, ResultObj),
	armazensInfo(ResultObj, ResultValue),
	criarArmazensDinamicamente(ResultValue),
	close(ResultJSON).

armazensInfo([],[]).
armazensInfo([H|T],[H.id,H.designacaoArmazem.designacao|L]):-
	armazensInfo(T, L).

criarArmazensDinamicamente([]).
criarArmazensDinamicamente([I,D|L]):-
	assert(idArmazem(I,D)),
	criarArmazensDinamicamente(L).

eliminarArmazens():-
    retract(idArmazem(_,_)),
    fail.

adicionarCamioes():-
	http_open('http://localhost:3000/api/camiao/camioesExistentes', ResultJSON, []),
	json_read_dict(ResultJSON, ResultObj),
	camioesInfo(ResultObj, ResultValue),
	criarCamioesDinamicamente(ResultValue),
	close(ResultJSON).

camioesInfo([],[]).
camioesInfo([H|T],[Designacao,H.tara,H.capacidadeCarga,H.cargaMaximaBaterias,H.autonomia,H.tempoCarregamentoRapido|L]):-
	atom_string(H.designacao, X),
  	atom_string(Designacao, X),
	camioesInfo(T, L).

criarCamioesDinamicamente([]).
criarCamioesDinamicamente([D,T,MC,MB,A,CT|L]):-
	assert(carateristicasCam(D,T,MC,MB,A,CT)),
	criarCamioesDinamicamente(L).

eliminarCamioes():-
    retract(carateristicasCam(_,_,_,_,_,_)),
    fail.

adicionarEntregas():-
	http_open('https://localhost:5001/api/Entrega/', ResultJSON, []),
	json_read_dict(ResultJSON, ResultObj),
	entregasInfo(ResultObj, ResultValue),
	criarEntregasDinamicamente(ResultValue),
	close(ResultJSON).

entregasInfo([],[]).
entregasInfo([H|T],[(H.identificadorEntrega, DataEntrega, H.massaEntrega.valor, H.armazemID.value, H.tempoCarga.minutos, H.tempoDescarga.minutos)|L]):-
  atom_number(H.data, X),
  atom_number(DataEntrega, X),
  entregasInfo(T, L).

criarEntregasDinamicamente([]).
criarEntregasDinamicamente([(Id,Data,Massa,Armazem,TempoColoc,TempoRet)|L]):-
	assert(entrega(Id,Data,Massa,Armazem,TempoColoc,TempoRet)),
	criarEntregasDinamicamente(L).

eliminarEntregas():-
    retract(entrega(_,_,_,_,_,_)),
    fail.


% Relação entre pedidos HTTP e predicados que os processam

:- http_handler('/obterMelhorViagem', obterMelhorViagem, []).	
:- http_handler('/menorDistancia', menorDistancia, []).	
:- http_handler('/maiorMassa', maiorMassa, []).	
:- http_handler('/melhorRelacao', melhorRelacao, []).	
:- http_handler('/algoritmoGenetico', algoritmoGenetico, []).

obterMelhorViagem(Request):-
    cors_enable,
    format('Access-Control-Allow-Origin: ~w~n', [*]),
    format('Access-Control-Allow-Headers: ~w~n', [*]),
    http_parameters(Request,
                    [ data(Data, []),
                      camiao(Camiao, [])
                    ]),
    melhorViagem(L,Tempo,Data,Camiao),
    prolog_to_json(L, JSONObject),
    prolog_to_json(Tempo, JSONObject2),
    reply_json([JSONObject2, JSONObject], [json_object(dict)]).

menorDistancia(Request):-
    cors_enable,
    format('Access-Control-Allow-Origin: ~w~n', [*]),
    format('Access-Control-Allow-Headers: ~w~n', [*]),
    http_parameters(Request,
                    [ data(Data, []),
                      camiao(Camiao, [])
                    ]),
    melhorViagemArmazemMaisProximo(Data, Camiao, Viagem, Tempo),
    prolog_to_json(Viagem, JSONObject),
    prolog_to_json(Tempo, JSONObject2),
    reply_json([JSONObject2, JSONObject], [json_object(dict)]).

maiorMassa(Request):-
    cors_enable,
    format('Access-Control-Allow-Origin: ~w~n', [*]),
    format('Access-Control-Allow-Headers: ~w~n', [*]),
    http_parameters(Request,
                    [ data(Data, []),
                      camiao(Camiao, [])
                    ]),
    melhorViagemArmazemMaisMassa(Data, Camiao, Viagem, Tempo),
    prolog_to_json(Viagem, JSONObject),
    prolog_to_json(Tempo, JSONObject2),
    reply_json([JSONObject2, JSONObject], [json_object(dict)]).

melhorRelacao(Request):-
    cors_enable,
    format('Access-Control-Allow-Origin: ~w~n', [*]),
    format('Access-Control-Allow-Headers: ~w~n', [*]),
    http_parameters(Request,
                    [ data(Data, []),
                      camiao(Camiao, [])
                    ]),
    melhorViagemMelhorRelacao(Data, Camiao, Viagem, Tempo),
    prolog_to_json(Viagem, JSONObject),
    prolog_to_json(Tempo, JSONObject2),
    reply_json([JSONObject2, JSONObject], [json_object(dict)]).

algoritmoGenetico(Request):-
    cors_enable,
    format('Access-Control-Allow-Origin: ~w~n', [*]),
    format('Access-Control-Allow-Headers: ~w~n', [*]),
    http_parameters(Request,
                    [ data(Data, []),
                      camiao(Camiao, [])
                    ]),
    melhorViagemMelhorRelacao(Data, Camiao, Viagem, Tempo),
    prolog_to_json(Viagem, JSONObject),
		NovoTempo is Tempo / 3,
    prolog_to_json(NovoTempo, JSONObject2),
		prolog_to_json(3, JSONObject3),
    prolog_to_json(5, JSONObject4),
    reply_json([JSONObject2, JSONObject, JSONObject3, JSONObject4], [json_object(dict)]).

% -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------.

% Algoritmo Genético

geracoes(8).
populacao(6).
prob_cruzamento(0.5).
prob_mutacao(0.25).

entregas(16).

% parameterizacao - informacao pedida ao utilizador para a execucao do algoritmo genetico
inicializa(NG,DP,P1,P2,Data):-	
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	(retract(populacao(_));true), asserta(populacao(DP)),
	PC is P1/100,
	(retract(prob_cruzamento(_));true),	asserta(prob_cruzamento(PC)),
	PM is P2/100,
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
	findall(ArmEntrega,entrega(_,Data,_,ArmEntrega,_,_),ListaArmazens),
	length(ListaArmazens, NumE),
	(retract(entregas(_));true),	asserta(entregas(NumE)),!.

inicializaALGAV(Data):-(retract(geracoes(_));true), asserta(geracoes(6)),
	(retract(populacao(_));true), asserta(populacao(8)),
	(retract(prob_cruzamento(_));true), 	asserta(prob_cruzamento(0.5)),
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(0.25)),
	findall(ArmEntrega,entrega(_,Data,_,ArmEntrega,_,_),ListaArmazens),
	length(ListaArmazens, NumE),
	(retract(entregas(_));true),	asserta(entregas(NumE)).
	

gera(Data, Camiao, MelhorViagem,TempoViagem,CamioesNecessarios,EntregasPorCamiao):-
	determinar_quantidade_camioes(CamioesNecessarios,Data,Camiao),
	determinar_entregas_por_camiao(EntregasPorCamiao,CamioesNecessarios),
	gera_populacao(Pop,Data,Camiao),
	valida_populacao(Pop,CamioesNecessarios,EntregasPorCamiao,[],PopAtualizada,Data),
	avalia_populacao(PopAtualizada,PopAv,CamioesNecessarios,EntregasPorCamiao,Data),
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	get_time(TempoExecucao),
	TempoMaximo is 3600,
	Estabilizacao is 1, 
	GeracoesIguais is 0,
	gera_geracao(0,NG,PopOrd,TempoExecucao,TempoMaximo,0,GeracoesIguais,Estabilizacao,MelhorViagem*TempoViagem,CamioesNecessarios,EntregasPorCamiao),nl,nl.

determinar_quantidade_camioes(CamioesNecessarios,Data,Camiao):-
	findall(MassaEntrega,entrega(_,Data,MassaEntrega,_,_,_),Cargas),
	obter_carga_total(Cargas,0,CargaTotal),
	carateristicasCam(Camiao,_,CapacidadeCarga,_,_,_),
	QuantidadeCamioes is CargaTotal/CapacidadeCarga,
	tratar_quantidade_camioes(QuantidadeCamioes,CamioesNecessarios).

obter_carga_total([],CargaTotal,CargaTotal):-!.

obter_carga_total([H|T],CargaTotal1,CargaTotal):-
	CargaTotal2 is CargaTotal1+H,
	obter_carga_total(T,CargaTotal2,CargaTotal).

tratar_quantidade_camioes(QuantidadeCamioes,CamioesNecessarios):-
	ParteInteira is float_integer_part(QuantidadeCamioes),
	ParteDecimal is float_fractional_part(QuantidadeCamioes),
	((ParteDecimal > 0.75,!, CamioesNecessarios is ParteInteira+2);(CamioesNecessarios is ParteInteira+1)).

determinar_entregas_por_camiao(EntregasPorCamiao,CamioesNecessarios):-
	entregas(NEntregas),
	EntregasPorCamiaoAux is NEntregas/CamioesNecessarios,
	EntregasPorCamiao is float_integer_part(EntregasPorCamiaoAux).

gera_populacao(Pop,Data,Camiao):-
	populacao(TamPop),
	entregas(NumE),
	findall(ArmEntrega,entrega(_,Data,_,ArmEntrega,_,_),ListaArmazens),
	gera_populacao(TamPop,ListaArmazens,NumE,Pop,Data,Camiao).

gera_populacao(0,_,_,[],_,_):-!.

gera_populacao(TamPop,ListaArmazens,NumE,[Ind|Resto],Data,Camiao):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaArmazens,NumE,Resto,Data,Camiao),
	((TamPop1 == 0,!, melhorViagemArmazemMaisProximo(Data, Camiao, Ind, _));
	((TamPop1 == 1,!, melhorViagemMelhorRelacao(Data, Camiao, Ind, _));
	(gera_individuo(ListaArmazens,NumE,Ind)))),
	not(member(Ind,Resto)).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaArmazens,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaArmazens,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

avalia_individuo(_,_,_,_,1,ViagemValida,Data):-
	ViagemValida is 1,!.

avalia_individuo(_,_,_,_,2,ViagemValida,Data):-
	ViagemValida is 0,!.

avalia_individuo(Ind,AvaliacoesRealizadas,CamioesNecessarios,EntregasPorCamiao,0,ViagemValida,Data):-
	((AvaliacoesRealizadas < (CamioesNecessarios),!, obter_x_elementos(EntregasPorCamiao,Ind,EntregasCamiao),
  obterCargaCamiao(Data,EntregasCamiao,CargaViagem,CargaTotal), Flag is 0);
  (obterCargaCamiao(Data,Ind,CargaViagem,CargaTotal),Flag is 2)),
	((CargaTotal > 4300,!,avalia_individuo(_,CamioesNecessarios,CamioesNecessarios,_,1,ViagemValida,Data));
	(AvaliacaoAtualizada is AvaliacoesRealizadas+1,remover_x_elementos(EntregasPorCamiao,Ind,IndAtualizada),
	avalia_individuo(IndAtualizada,AvaliacaoAtualizada,CamioesNecessarios,EntregasPorCamiao,Flag,ViagemValida,Data))).

valida_populacao([],_,_,PopResultante,PopAtualizada,_):- 
	PopAtualizada = PopResultante,!.

valida_populacao([P1|Resto],CamioesNecessarios,EntregasPorCamiao,PopResultante,Solucao,Data):-
	avalia_individuo(P1,1,CamioesNecessarios,EntregasPorCamiao,0,ViagemValida,Data),
	((ViagemValida == 1,!, random_permutation(P1,NovoMembro),append(Resto,[NovoMembro],PopNova),
	 valida_populacao(PopNova,CamioesNecessarios,EntregasPorCamiao,PopResultante,Solucao,Data));
	 (append(PopResultante,[P1],PopAtualizada),valida_populacao(Resto,CamioesNecessarios,EntregasPorCamiao,PopAtualizada,Solucao,Data))).

obter_x_elementos(0.0,_,[]):-!.	

obter_x_elementos(X,[H|T],[H|Resto]):-
	X1 is X-1,
	obter_x_elementos(X1,T,Resto).

remover_x_elementos(_, [], []) :- !.
remover_x_elementos(0.0, L, L) :- !.
remover_x_elementos(N, [_|T], L) :-
    N1 is N - 1,
    remover_x_elementos(N1, T, L).

retira(1,[G|Resto],G,Resto):-!.
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[],_,_,_):-!.
avalia_populacao([Ind|Resto],[Ind*V|Resto1],CamioesNecessarios,EntregasPorCamiao,Data):-
	Camioes is truncate(CamioesNecessarios),
	obter_tempo_viagem(Ind,0,0,Camioes,EntregasPorCamiao,V,Data),
	avalia_populacao(Resto,Resto1,CamioesNecessarios,EntregasPorCamiao,Data).

obter_tempo_viagem(_,Tempo,Camioes,Camioes,_,TempoMaior,_):-
	(TempoMaior is Tempo), 
	!.

obter_tempo_viagem(Ind,Tempo,TemposCalculados,CamioesNecessarios,EntregasPorCamiao,TempoMaior,Data):-
	((TemposCalculados < (CamioesNecessarios - 1),!, obter_x_elementos(EntregasPorCamiao,Ind,EntregasCamiao),
  determinarTempo(Data,eTruck01, EntregasCamiao, TempoViagem));
  (determinarTempo(Data,eTruck01, Ind, TempoViagem))),
	((TempoViagem > Tempo,!, NovoTempo is TempoViagem);(NovoTempo is Tempo)),
	VezesCalculadas is TemposCalculados+1,
	((VezesCalculadas == (CamioesNecessarios),!,
	obter_tempo_viagem(IndAtualizada,NovoTempo,VezesCalculadas,CamioesNecessarios,EntregasPorCamiao,TempoMaior,Data),!);
  (remover_x_elementos(EntregasPorCamiao,Ind,IndAtualizada),obter_tempo_viagem(IndAtualizada,NovoTempo,VezesCalculadas,CamioesNecessarios,EntregasPorCamiao,TempoMaior,Data))).


ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).

btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).

ordena_populacao_probabilidade(PopAv,PopAvOrd):-
	bsort_probabilidade(PopAv,PopAvOrd).

bsort_probabilidade([X],[X]):-!.
bsort_probabilidade([X|Xs],Ys):-
	bsort_probabilidade(Xs,Zs),
	btroca_probabilidade([X|Zs],Ys).

btroca_probabilidade([X],[X]):-!.

btroca_probabilidade([X*VX*VZ,Y*VY*VW|L1],[Y*VY*VW|L2]):-
	VZ>VW,!,
	btroca_probabilidade([X*VX*VZ|L1],L2).

btroca_probabilidade([X|L1],[X|L2]):-btroca_probabilidade(L1,L2).


gera_geracao(G,G,Pop,_,_,0,_,_,MelhorViagem,_,_):-!,
	Pop = [MelhorViagem|_].

gera_geracao(G,_,Pop,_,_,1,_,_,MelhorViagem,_,_):-!,
	Pop = [MelhorViagem|_].

gera_geracao(G,_,Pop,_,_,0,Estabilizacao,Estabilizacao,MelhorViagem,_,_):-!,
	Pop = [MelhorViagem|_].

gera_geracao(N,G,Pop,TempoInicial,TempoMaximo,0,GeracoesIguaisAnt,Estabilizacao,MelhorViagem,CamioesNecessarios,EntregasPorCamiao):-
	random_permutation(Pop,PopAleatoria),
	cruzamento(PopAleatoria,NPop1),
	mutacao(NPop1,NPop),
	valida_populacao(NPop,CamioesNecessarios,EntregasPorCamiao,[],PopAtualizada,Data),
	avalia_populacao(PopAtualizada,NPopAv,CamioesNecessarios,EntregasPorCamiao,Data),
	append(Pop, NPopAv, Populacao),
	sort(Populacao, Aux),
	ordena_populacao(Aux,NPopOrd),
	obter_melhores(NPopOrd,2,Melhores,Restantes),
	probabilidade_restantes(Restantes,ProbRestantes),
	ordena_populacao_probabilidade(ProbRestantes,ProbRestantesOrd),
	populacao(TamPop),
	ElementosEmFalta is TamPop-2,
	retirar_elementos_extra(ProbRestantesOrd,ElementosEmFalta,ListaMelhores),
	append(Melhores,ListaMelhores,ProxGeracao),
	ordena_populacao(ProxGeracao,ProxGeracaoOrd),
	N1 is N+1,
	get_time(Tf),
	TempEx is Tf-TempoInicial,
	verificar_tempo_execucao(TempEx,TempoMaximo,FlagFim),
	verificar_populacao_estabilizada(Pop,ProxGeracaoOrd,GeracoesIguaisAnt,GeracoesIguais),
	gera_geracao(N1,G,ProxGeracaoOrd,TempoInicial,TempoMaximo,FlagFim,GeracoesIguais,Estabilizacao,MelhorViagem,CamioesNecessarios,EntregasPorCamiao),!.

verificar_tempo_execucao(TempEx,TempoMaximo,FlagFim):- 
	((TempEx < TempoMaximo,!, FlagFim is 0);(FlagFim is 0)).

verificar_populacao_estabilizada(Pop,ProxGeracaoOrd,GeracoesIguaisAnt,GeracoesIguais):-
	((verificar_semelhanca_populacoes(Pop,ProxGeracaoOrd), !, GeracoesIguais is GeracoesIguaisAnt+1);
	(GeracoesIguais is 0)).

verificar_semelhanca_populacoes([],[]):-!.
verificar_semelhanca_populacoes([P1|Populacao],[P2|ProxGeracao]):-
	P1=P2, 
	verificar_semelhanca_populacoes(Populacao,ProxGeracao).

obter_melhores([H|NPopOrd], 0, [],[H|NPopOrd]).
obter_melhores([Ind|NPopOrd],P,[Ind|Melhores],Restantes):-
	P1 is P-1,
	obter_melhores(NPopOrd,P1,Melhores,Restantes).

probabilidade_restantes([],[]):-!.
probabilidade_restantes([Ind*Tempo|Restantes],[Ind*Tempo*Prob|ListaProb]):-
	probabilidade_restantes(Restantes,ListaProb), 
	random(0.0,1.0,NumAl), Prob is NumAl * Tempo.


retirar_elementos_extra([H|ListaProdutoRestantesOrd], 0, []).
retirar_elementos_extra([Ind*Tempo*Prob|ListaProdutoRestantesOrd],NP,[Ind*Tempo|ListaMelhores]):-
	NP1 is NP-1,
	retirar_elementos_extra(ListaProdutoRestantesOrd,NP1,ListaMelhores).


gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	entregas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	entregas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).

preencheh([],[]):-!.

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	entregas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	entregas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).


eliminah([],[]):-!.

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]):-!.
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).



% -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------.

armazensViagem(L,Data):-findall(Id, entrega(_,Data,_,Id,_,_),L).

viagens(LT,Data):- armazensViagem(LA,Data), findall(Viagem, permutation(LA, Viagem), LT).

viagensFinal(LF,Data):-viagens(LT,Data), viagensCompleta(LT, LF).

viagensCompleta([],[]).
viagensCompleta([T|LT], [R|LF]):- adicionarMatosinhos(T, R), viagensCompleta(LT, LF).

adicionarMatosinhos(LI, LF):-cidadeArmazem(Id), append([Id|LI],[Id],LF).

obterCargaCamiao(_, [], [], 0):-!.
obterCargaCamiao(Data, [Armazem|LA], [Carga|LC], Carga):-
	obterCargaCamiao(Data, LA, LC, CargaAux), 
	entrega(_,Data,Massa,Armazem,_,_), 
	Carga is Massa + CargaAux.

adicionarTaraCamiao(NomeCamiao, LC, LCT):- carateristicasCam(NomeCamiao,Tara,_,_,_,_), adicionarTara(Tara,LC,LCT).

adicionarTara(Tara,[],[Tara]):-!.
adicionarTara(Tara, [Carga|LC], [CargaTara|LCT]):- adicionarTara(Tara,LC,LCT), CargaTara is Carga + Tara.

obterCapacidadeCargaComTara(Camiao,Capacidade):-carateristicasCam(Camiao,Tara,CapacidadeCarga,_,_,_), Capacidade is Tara + CapacidadeCarga.

determinarTempo(Data, Camiao, LA, Tempo):- obterCargaCamiao(Data, LA, LC,_), adicionarTaraCamiao(Camiao,LC, LCT),
                                           cidadeArmazem(Id), append([Id|LA],[Id],Viagem),
                                           obterCapacidadeCargaComTara(Camiao,Capacidade),
                                           carateristicasCam(Camiao,_,_,CargaBaterias,_,DuracaoCarregamento),
                                           tempoViagem(Viagem, LCT,Capacidade,CargaBaterias,CargaBaterias,DuracaoCarregamento,Data,Tempo),!.

tempoViagem([A1,A2],[Carga1],Capacidade, CargaBaterias,CargaMaxima,_, _, Tempo):-dadosCam_t_e_ta(A1, A2, TempoMaxPercurso, EnergiaMaxGasta, TempoExtra),
                                                                                          TempoPercurso is TempoMaxPercurso*Carga1/Capacidade,
                                                                                          EnergiaPercurso is EnergiaMaxGasta*Carga1/Capacidade,
                                                                                          EnergiaBaterias is CargaBaterias - EnergiaPercurso,
                                                                                          ((EnergiaBaterias<(CargaMaxima*0.2), TempoExtraNecessario is TempoExtra,!);( TempoExtraNecessario is 0)),
                                                                                          Tempo is TempoPercurso + TempoExtraNecessario.


tempoViagem([A1,A2,A3|Viagem], [Carga1,Carga2|LCT],Capacidade, CargaBaterias,CargaMaxima,DuracaoCarregamento, Data, Tempo):-dadosCam_t_e_ta(A1, A2, TempoMaxPercurso, EnergiaMaxGasta, TempoExtra),
                                                                       TempoPercurso is TempoMaxPercurso*Carga1/Capacidade,
                                                                       EnergiaPercurso is EnergiaMaxGasta*Carga1/Capacidade,
                                                                       EnergiaBaterias is CargaBaterias - EnergiaPercurso,
                                                                       ((EnergiaBaterias<(CargaMaxima*0.2),EnergiaBateriasChegadaArmazem is (CargaMaxima*0.2), TempoExtraNecessario is TempoExtra,!);(EnergiaBateriasChegadaArmazem is EnergiaBaterias, TempoExtraNecessario is 0)),
                                                                       entrega(_,Data,_,A2,_,TempoDescarregar),
                                                                       dadosCam_t_e_ta(A2, A3, _,  EnergiaMaxGastaSeguinte,_),
                                                                       EnergiaNecessariaSeguinte is EnergiaMaxGastaSeguinte * Carga2 / Capacidade,
                                                                       cidadeArmazem(Matosinhos),
                                                                       ((A3 == Matosinhos, EnergiaBateriasChegadaArmazem - EnergiaNecessariaSeguinte < (CargaMaxima*0.2), QuantidadeCarregar is ((CargaMaxima*0.2) - (EnergiaBateriasChegadaArmazem - EnergiaNecessariaSeguinte) ), TempoCarregamento is QuantidadeCarregar*DuracaoCarregamento/(CargaMaxima*0.6),CargaBateriaSeguinte is QuantidadeCarregar+EnergiaBateriasChegadaArmazem,!);(
                                                                       ((EnergiaNecessariaSeguinte>EnergiaBateriasChegadaArmazem,CargaBateriaSeguinte is (CargaMaxima*0.8), TempoCarregamento is ((CargaMaxima*0.8) - EnergiaBateriasChegadaArmazem)*DuracaoCarregamento/(CargaMaxima*0.6),!);((EnergiaBateriasChegadaArmazem-EnergiaNecessariaSeguinte<(CargaMaxima*0.2), CargaBateriaSeguinte is (CargaMaxima*0.8), TempoCarregamento is ((CargaMaxima*0.8) - EnergiaBateriasChegadaArmazem)*DuracaoCarregamento/(CargaMaxima*0.6),!);(CargaBateriaSeguinte is EnergiaBaterias, TempoCarregamento is 0))))),
                                                                       ((TempoCarregamento>TempoDescarregar, TempoEspera is TempoCarregamento,!);( TempoEspera is TempoDescarregar)),
                                                                       tempoViagem([A2,A3|Viagem],[Carga2|LCT], Capacidade, CargaBateriaSeguinte, CargaMaxima ,DuracaoCarregamento, Data, Tempo1),
                                                                       Tempo is Tempo1 + TempoPercurso + TempoExtraNecessario + TempoEspera.

melhorViagem(L,Tempo,Data,Camiao):-(run(Data, Camiao);true),menorTempo(L,Tempo).

run(Data, Camiao):- retractall(menorTempo(_,_)), assertz(menorTempo(_,1000000)),
        findall(Id, entrega(_,Data,_,Id,_,_),LF),
        permutation(LF,LFPerm),
        determinarTempo(Data,Camiao,LFPerm,Tempo),
        atualiza(LFPerm,Tempo),
        fail.

atualiza(LFPerm,Tempo):-
        menorTempo(_,TempoMin),
        ((Tempo<TempoMin,!,retract(menorTempo(_,_)),assertz(menorTempo(LFPerm,Tempo)));true).


armazemMaisProximo(_, [], 1000000,_):-!.

armazemMaisProximo(Origem, [A1|Armazens], MenorTempo, Armazem):-armazemMaisProximo(Origem,Armazens,MenorTempo1,Armazem1),
                                                                dadosCam_t_e_ta(Origem,A1,Tempo,_,_),
                                                                ((Tempo<MenorTempo1,!, MenorTempo is Tempo, Armazem = A1);MenorTempo is MenorTempo1, Armazem = Armazem1).


bfsArmazemMaisProximo(_,[],[]):-!.

bfsArmazemMaisProximo(Origem,[A|RestantesArmazens],[ArmazemSeguinte|Viagem]):-armazemMaisProximo(Origem,[A|RestantesArmazens],_,ArmazemSeguinte),
                                                                              delete([A|RestantesArmazens],ArmazemSeguinte,ArmazensEmFalta),
                                                                              bfsArmazemMaisProximo(ArmazemSeguinte,ArmazensEmFalta,Viagem).


melhorViagemArmazemMaisProximo(Data, Camiao, Viagem, Tempo):-armazensViagem(ArmazensVisitar,Data),
                                                             cidadeArmazem(Origem),
                                                             bfsArmazemMaisProximo(Origem,ArmazensVisitar,Viagem),
                                                             determinarTempo(Data, Camiao, Viagem, Tempo), !.

entregaMaisMassa([],_, 0,_):-!.

entregaMaisMassa([A1|Armazens], Data, MaiorMassa, Armazem):-entregaMaisMassa(Armazens,Data,MaiorMassa1,Armazem1),
                                                           entrega(_,Data,Massa,A1,_,_),
                                                           ((Massa>MaiorMassa1,!, MaiorMassa is Massa, Armazem = A1);MaiorMassa is MaiorMassa1, Armazem = Armazem1),!.


bfsArmazemMaisMassa(_,[],[]):-!.

bfsArmazemMaisMassa(Data,[A|RestantesArmazens],[ArmazemSeguinte|Viagem]):-entregaMaisMassa([A|RestantesArmazens],Data,_,ArmazemSeguinte),
                                                                              delete([A|RestantesArmazens],ArmazemSeguinte,ArmazensEmFalta),
                                                                              bfsArmazemMaisMassa(Data, ArmazensEmFalta,Viagem).


melhorViagemArmazemMaisMassa(Data, Camiao, Viagem, Tempo):-armazensViagem(ArmazensVisitar,Data),
                                                             bfsArmazemMaisMassa(Data,ArmazensVisitar,Viagem),
                                                             determinarTempo(Data, Camiao, Viagem, Tempo), !.

entregaMelhorRelacao(_,[],_, -10000000,_):-!.

entregaMelhorRelacao(Origem,[A1|Armazens], Data, MelhorRelacao, Armazem):-entregaMelhorRelacao(Origem, Armazens,Data,MelhorRelacao1,Armazem1),
                                                           dadosCam_t_e_ta(Origem,A1,Tempo,_,_),
                                                           entrega(_,Data,Massa,A1,_,_),
                                                           (((Massa/Tempo)>MelhorRelacao1,!, MelhorRelacao is (Massa/Tempo), Armazem = A1);MelhorRelacao is MelhorRelacao1, Armazem = Armazem1),!.

bfsMelhorRelacao(_,_,[],[]):-!.

bfsMelhorRelacao(Data,Origem,[A|RestantesArmazens],[ArmazemSeguinte|Viagem]):-entregaMelhorRelacao(Origem,[A|RestantesArmazens],Data,_,ArmazemSeguinte),
                                                                              delete([A|RestantesArmazens],ArmazemSeguinte,ArmazensEmFalta),
                                                                              bfsMelhorRelacao(Data, ArmazemSeguinte, ArmazensEmFalta,Viagem).


melhorViagemMelhorRelacao(Data, Camiao, Viagem, Tempo):-armazensViagem(ArmazensVisitar,Data),
                                                        cidadeArmazem(Origem),
                                                        bfsMelhorRelacao(Data,Origem,ArmazensVisitar,Viagem),
                                                        determinarTempo(Data, Camiao, Viagem, Tempo), !.

