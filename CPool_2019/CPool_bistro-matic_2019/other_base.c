/*
** EPITECH PROJECT, 2019
** other base
** File description:
** other base
*/

#include "include/bistromatic.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int test_parenthese(char *expr, char *signe)
{
    char *endptr;
    my_strtol(expr, &endptr, signe);
    char sign = endptr[0];
    while (*endptr){
        if (sign == signe[OP_OPEN_PARENT_IDX] ||
            sign == signe[OP_CLOSE_PARENT_IDX]){
            return 1;
        }
        my_strtol(endptr, &endptr, signe);
    }
    return 0;
}

int compare_tab(char *base, char *original)
{
    int i = 0;
    for (i = 0 ; i < 10 ; i++){
        if (base[i] != original[i]){
            return 0;
        }
    }
    return 1;
}

char *traduction_base(char *expr, char *base)
{
    int i = 0;
    int j = 0;
    while (expr[i] != '\0'){
        for (j = 0 ; j < 10 ; j++){
            if (expr[i] == base[j]){
                expr[i] = j + 48;
            }
        }
        i++;
    }
    return expr;
}