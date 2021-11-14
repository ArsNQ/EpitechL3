/*
** EPITECH PROJECT, 2019
** my_strlen
** File description:
** Task03
*/

#include "my.h"

int my_strlen(char const *str)
{
    int i = 0;
    while (str[i] != '\0')
    {
        i++;
    }
    return (i);
}