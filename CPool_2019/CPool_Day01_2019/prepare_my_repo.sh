#!/bin/sh
blih -u quentin.tridon@epitech.eu repository create $1 
blih -u quentin.tridon@epitech.eu repository setacl $1 ramassage-tek r
blih -u quentin.tridon@epitech.eu repository getacl $1
