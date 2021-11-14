/*
** EPITECH PROJECT, 2019
** concat_params
** File description:
** task02
*/

#include <stdlib.h>
#include "include/my.h"

char *concat_params(int argc, char **argv)
{
    int i = 0;
    int len = 0;
    char *res;

    while (i < argc)
    {
        len = len + my_strlen(argv[i]) + 1;
        i++;
    }
    res = malloc(sizeof(char) * len + 1);
    i = 0;
    while (i < argc)
    {
        my_strcat(res, argv[i]);
        my_strcat(res, "\n");
        i++;
    }

    res[len] = '\0';
    return res;
}