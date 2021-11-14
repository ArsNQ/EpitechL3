/*
** EPITECH PROJECT, 2019
** my_strdup
** File description:
** Task01
*/

#include "include/my.h"
#include <stdlib.h>

char *my_strdup(char const *src)
{
    int i = 0;
    char *cpy;

    i = my_strlen(src) + 1;
    cpy = malloc(sizeof(char) * i);

    if (cpy == NULL)
    {
        return (0);
    }
    my_strcpy(cpy, src);
    cpy[i] = '\0';
    return cpy;
}