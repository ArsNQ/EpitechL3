/*
** EPITECH PROJECT, 2019
** main
** File description:
** main
*/

#include "include/bistromatic.h"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

char *higher(char *argv_1, char *argv_2)
{
    if (my_strlen(argv_1) >= my_strlen(argv_2))
        return argv_1;
    else return argv_2;
}

void *my_memset(void *s, int c, size_t n)
{
    unsigned char *p = s;
    while (n--)
        *p++ = (unsigned char)c;
    return s;
}

char *add(char *argv_1, char *argv_2)
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
        addition(argv_1[i], argv_2[i], res, &ret);
        i++;
    }
    while (ret != 0){
        if (max[i] != '\0') addition_2(max[i], &ret, res);
        else{
            res[i] = '1';
            ret = 0;
        } i++;
    }
    if (i <= max_l) my_strcpy(&res[i], &max[i]);
    return my_revstr(res);
}