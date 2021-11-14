/*
** EPITECH PROJECT, 2019
** eval_xpr
** File description:
** eval_xpr
*/

#include <stdlib.h>
#include <stdio.h>
#include "include/bistromatic.h"

int test_plus_or_minus(char *str, char *signe)
{
    char *endptr;
    my_strtol(str, &endptr, signe);
    char sign = endptr[0];
    while (*endptr){
        if (sign != endptr[0] || sign == signe[OP_MOD_IDX] ||
            sign == signe[OP_MULT_IDX] || sign == signe[OP_DIV_IDX]){
            return 0;
        }
        my_strtol(endptr, &endptr, signe);
    }
    return 1;
}

int test_plus_and_minus(char *str, char *signe)
{
    char *endptr;
    my_strtol(str, &endptr, signe);
    while (endptr[0] == signe[2] || endptr[0] == signe[3]){
        my_strtol(endptr, &endptr, signe);
    }
    if (!*endptr)
        return 1;
    else
        return 0;
}

char *special_operation_2(char *expr, char *signe)
{
    char *endptr;
    char *res = my_strtol(expr, &endptr, signe);
    while (*endptr){
        if (endptr[0] == signe[2])
            res = add(my_revstr(res), my_revstr(my_strtol(endptr,
            &endptr, signe)));
        if (endptr[0] == signe[3])
            res = negatif(res, my_strtol(endptr, &endptr, signe));
    }
    return res;
}

char *special_operation_1(char *expr, char *signe)
{
    char *endptr;
    char *res = my_strtol(expr, &endptr, signe);
    char sign = endptr[0];
    if (sign == signe[2]){
        while (*endptr)
            res = add(my_revstr(res), my_revstr(my_strtol(endptr,
            &endptr, signe)));
        return res;
    } if (expr[0] == signe[3]){
        my_putchar('-');
        while (*endptr)
            res = add(my_revstr(res), my_revstr(my_strtol(endptr,
            &endptr, signe)));
        return res;
    } if (expr[0] != signe[3] && sign == signe[3]){
        my_putchar('-');
        while (*endptr) res = negatif(res, my_strtol(endptr, &endptr, signe));
        return res;
    }
}

char *eval_expr(char *base, char *signe, char *expr, unsigned int size)
{
    char *res = malloc(sizeof(char) * size);
    char *endptr;
    expr = traduction_base(expr, base);

    if (test_plus_or_minus(expr, signe) == 1)
        res = special_operation_1(expr, signe);
    else if (test_plus_and_minus(expr, signe) == 1)
        res = special_operation_2(expr, signe);
    else return ERROR_MSG;

    return res;
}