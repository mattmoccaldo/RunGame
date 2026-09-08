#!/bin/bash

FILE="studenti.txt"

#INSERIMENTO NUOVO STUDENTE
echo "Inserisci il nome dello studente:"
read nome
echo "Inserisci il comune:"
read comune
echo "Inserisci l'anno di nascita:"
read anno

#Salva i dati in coda al file (senza cancellare quelli vecchi)
echo "$nome;$comune;$anno" >> $FILE
echo "Studente salvato!"
echo ""

#Contare studenti nel comune
COMUNE_CER CATO=$1

echo "Numero di studenti a $COMUNE_CER CATO:"
grep -i ";$COMUNE_CERCATO;" $FILE | wc -l
echo ""

#Nomi studenti nati prima di un dato anno
echo "Inserisci l'anno di riferimento:"
read anno_rif

echo "Studenti nati prima del $anno_rif:"
# Legge il file riga per riga
cat $FILE | while IFS=";" read nome comune anno
do
  if [ $anno -lt $anno_rif ]; then
    echo $nome
  fi
done