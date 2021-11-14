/*
** EPITECH PROJECT, 2019
** my_putchar
** File description:
** write a charactere
*/

#include <stdio.h>
#include <unistd.h>

void my_putchar(char caractere)
{
    write (1, &caractere, 1);
}
