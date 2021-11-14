/*
** EPITECH PROJECT, 2019
** my_list_size
** File description:
** task02
*/

#include "include/mylist.h"
#include <stdio.h>
#include <stdlib.h>

linked_list_t *my_list_size(linked_list_t const *begin)
{
    linked_list_t *element;
    int a = 0;

    element = begin;
    while (element != NULL){
        a++;
        element = element->next;
    }
    return a;
}