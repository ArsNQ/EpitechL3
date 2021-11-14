/*
** EPITECH PROJECT, 2019
** my_getnbr
** File description:
** my_getnbr
*/

#include <unistd.h>
#include "my.h"

int my_getnbr(char const *str)
{
    int res;
    int end = 1;

    res = 0;
    while ((*str >= 9 && *str <= 13) || *str == ' ')
        str++;
    if (*str == '-')
        end *= -1;
    while (*str == '-' || *str == '+')
        str++;
    while (*str >= '0' && *str <= '9')
    {
        res = res * 10 + (*str - 48);
        str++;
    }
    return (end * res);
}