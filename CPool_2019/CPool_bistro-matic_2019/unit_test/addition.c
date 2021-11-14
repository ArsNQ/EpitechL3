/*
** EPITECH PROJECT, 2019
** addition
** File description:
** addition
*/

#include "include/bistromatic.h"

void addition(char sum1, char sum2, char *res, int *ret)
{
    int total = 0;
    total = (sum1 - 48) + (sum2 - 48) + *ret;
    *ret = 0;
    if (total > 9){
        total = total - 10;
        *ret = 1;
    }
    my_charcat(res, total + 48);
}

void addition_2(char sum1, int *ret, char *res)
{
    int total = 0;
    total = (sum1 - 48) + *ret;
    *ret = 0;
    if (total > 9){
        total = total - 10;
        *ret = 1;
    }
    my_charcat(res, total + 48);
}