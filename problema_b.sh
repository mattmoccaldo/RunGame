#!/bin/bash

#Cartella e info
echo "Inserisci il nome della cartella:"
read cartella

#Mostra il contenuto della cartella
ls $cartella

echo ""
echo "Nome utente:"
whoami

echo "Percorso corrente:"
pwd

echo "Data odierna:"
date +%d/%m/%Y

#Creazione file network.log
#Crea il file nella cartella e ci scrive l'output dei comandi di rete
echo "--- CONFIGURAZIONE RETE ---" > $cartella/network.log
ip a >> $cartella/network.log

echo "--- TEST PING ---" >> $cartella/network.log
ping -c 2 8.8.8.8 >> $cartella/network.log

#Salva lo storico dei comandi
# Salva la cronologia dei comandi eseguiti nel file storico.txt
history > storico.txt