/*
** EPITECH PROJECT, 2019
** my.h
** File description:
** my bilbio
*/

#ifndef MY_H
#define MY_H

typedef struct linked_list
{
    void *data;
    struct linked_list *next;
} linked_list_t;

char *my_revstr(char *str);
char *my_strcpy(char *dest, char const *src);
int my_strlen(char const *str);
void my_putchar(char);
void my_addition(char argv_1, char argv_2, char *res, int *ret);
void my_addition_2(char argv_1, int *ret, char *res);
char *my_char_cat(char *dest, const char src);

#endif