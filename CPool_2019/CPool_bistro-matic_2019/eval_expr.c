/*
** EPITECH PROJECT, 2019
** main
** File description:
** main
*/

#include "include/bistromatic.h"
#include <stdio.h>
#include <stdlib.h>

int calcul(char *str, char *tab)
{
    char *pt;
    int res = my_strtol2(str, &pt, tab);
    while (*pt){
        char sg = pt[0];
        if (my_signe(pt[0], tab) >= next_signe(pt, tab)){
            if (sg == tab[4]) res *= my_strtol2(pt, &pt, tab);
            if (sg == tab[2] || sg == tab[3]) res += my_strtol2(pt, &pt, tab);
            if (sg == tab[5]) res /= my_strtol2(pt, &pt, tab);
            if (sg == tab[6]) res %= my_strtol2(pt, &pt, tab);
        } else {
            int res2 = my_strtol2(pt, &pt, tab);
            int total = 0;
            char s2 = pt[0];
            if (s2 == tab[4])
                total = res2 * my_strtol2(pt, &pt, tab);
            if (s2 == tab[5])
                total = res2 / my_strtol2(pt, &pt, tab);
            if (sg == tab[2]) res += total;
            if (sg == tab[3]) res -= total;
        }
    } return res;
}