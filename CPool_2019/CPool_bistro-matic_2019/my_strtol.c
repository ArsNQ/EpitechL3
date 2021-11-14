/*
** EPITECH PROJECT, 2019
** my_strtol
** File description:
** my_strtol
*/

#include <stdlib.h>
#include "include/bistromatic.h"

char *my_strtol(char *str, char **endptr, char *signe)
{
    char *res = malloc(sizeof(char) * my_strlen(str));
    char c;
    c = *str;
    int j = 0;
    while (*str == ' ')
        str++;
    if (c == signe[0] || c == signe[1] || c == signe[2] || c == signe[3] ||
        c == signe[4] || c == signe[5] || c == signe[6]){
        str++;
    }
    while (*str >= '0' && *str <= '9'){
        res[j] = *str;
        str++;
        j++;
    }
    if (endptr != NULL)
        *endptr = str;
    return res;
}

int my_strtol2(char *str, char **endptr, char *signe)
{
    int res = 0;
    int i = 0;
    char c;
    while (*str == ' ')
        str++;
    c = *str;
    if (c == signe[0] || c == signe[1] || c == signe[2] || c == signe[3] ||
        c == signe[4] || c == signe[5] || c == signe[6])
        str++;
    while (*str >= '0' && *str <= '9')
    {
        res = res * 10 + *str - '0';
        str++;
    }
    if (endptr != NULL)
        *endptr = str;
    if (c == '-')
        res = -res;
    return res;
}