/*
** EPITECH PROJECT, 2019
** my_putstr
** File description:
** display a string of characters
*/

#include <stdio.h>
#include "include/bistromatic.h"

int my_putstr(char const *str)
{
    int i = 0;

    while (str[i] != '\0'){
        my_putchar(str[i]);
        i++;
    }
    return 0;
}