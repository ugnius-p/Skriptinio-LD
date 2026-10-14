function [out] = atsitiktiniai(eil_sk, stulp_sk, max_n)
%Funkcijos veikimas: sugeneruoja norimo dydzio atsitiktiniu naturialiuju
% skaiciu masyva intervale [1:N]
%Funkcijos argumentai (iejimo kintamieji): eiluciu skaicius, stulpeliu
%skaicius, maksimali galima reiksme N
%Funkcijos grazinami (isejimo) kintamieji: sugeneruotas masyvas
out = ceil(rand(eil_sk, stulp_sk)*max_n);
end