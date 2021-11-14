/*
** EPITECH PROJECT, 2019
** my_putchar
** File description:
** my_putchar
*/

#include <unistd.h>

void my_putchar(const char caractere)
{
    write(1, &caractere, 1);
}