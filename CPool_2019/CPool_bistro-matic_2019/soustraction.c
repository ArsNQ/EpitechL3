/*
** EPITECH PROJECT, 2019
** soustraction
** File description:
** soustraction
*/

#include <stdlib.h>
#include "include/bistromatic.h"

void *my_memset(void *s, int c, size_t n);

char *minus(char *argv)
{
    int i = my_strlen(argv);
    my_revstr(argv);
    argv[i - 1] = '\0';
    return my_revstr(argv);
}

void soustraction(char sum1, char sum2, char *res, int *ret)
{
    int total = 0;
    total = (sum2 - 48) - ((sum1 - 48) + *ret);
    *ret = 0;
    if (total < 0){
        total = total + 10;
        *ret = 1;
    }
    my_charcat(res, total + 48);
}

void soustraction_2(char sum1, int *ret, char *res)
{
    int total = 0;
    total = (sum1 - 48) - *ret;
    *ret = 0;
    if (total < 0){
        total = total + 10;
        *ret = 1;
    }
    my_charcat(res, total + 48);
}

char *sub(char *argv_1, char *argv_2)
{
    int i = 0;
    int total_len = my_strlen(argv_1) + my_strlen(argv_2);
    int total = 0;
    int ret = 0;
    char *max = higher(argv_1, argv_2);
    int max_l = my_strlen(max) - 1;
    char *res = malloc(total_len);
    res = my_memset(res, 0, total_len);
    while (argv_1[i] != '\0' && argv_2[i] != '\0'){
        soustraction(argv_1[i], argv_2[i], res, &ret);
        i++;
    }
    while (ret != 0){
        if (max[i] != '\0') soustraction_2(max[i], &ret, res);
        else{
            res[i] = '1';
            ret = 0;
        } i++;
    }
    if (i <= max_l) my_strcpy(&res[i], &max[i]);
    return my_revstr(res);
}