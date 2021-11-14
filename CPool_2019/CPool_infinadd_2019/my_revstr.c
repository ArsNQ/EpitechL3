/*
** EPITECH PROJECT, 2019
** my_revstr
** File description:
** Inverse a string
*/

#include <stdio.h>

char *my_revstr(char *str)
{
    int i = 0;
    int j = 0;
    char c;
    while (str[i] != '\0'){
        i++;
    }

    for (j = 0 ; j < i/2 ; j++){
        c = str[j];
        str[j] = str[i - j - 1];
        str[i - j - 1] = c;
    }
    return str;
}
