/*
** EPITECH PROJECT, 2019
** my_strcat
** File description:
** empty
*/

#include <stdio.h>

char *my_charcat(char *dest, const char src)
{
    int i = 0;
    int j = 0;

    while (dest[i] != '\0')
        i++;

    dest[i] = src;

    dest[i + 1] = '\0';
    return dest;
}