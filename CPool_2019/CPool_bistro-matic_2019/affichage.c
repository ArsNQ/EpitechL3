/*
** EPITECH PROJECT, 2019
** affichage
** File description:
** affichage
*/

#include "include/bistromatic.h"

char *compare(char *argv1, char *argv2)
{
    int i = 0;
    while (argv1[i] != argv2[i]){
        if (argv1[i] > argv2[i]){
            return argv1;
        }
        else if (argv2[i] > argv1[i]){
            return argv2;
        }
        i++;
    }
}

char *compare_low(char *argv1, char *argv2)
{
    int i = 0;
    while (argv1[i] != argv2[i]){
        if (argv1[i] < argv2[i]){
            return argv1;
        }
        else if (argv2[i] < argv1[i]){
            return argv2;
        }
        i++;
    }
}

char *negatif(char *argv1, char *argv2)
{
    if (my_strlen(argv1) > my_strlen(argv2)){
        return (sub(my_revstr(argv2), my_revstr(argv1)));
    }
    else if (my_strlen(argv1) < my_strlen(argv2)){
        return sub(my_revstr(argv1), my_revstr(argv2));
    }
    else if (my_strlen(argv1) == my_strlen(argv2)){
        char *bigger = compare(argv1, argv2);
        char *lower = compare_low(argv1, argv2);
        if (bigger != lower){
            return sub(my_revstr(lower), my_revstr(bigger));
        }
        else return "0\0";
    }
}