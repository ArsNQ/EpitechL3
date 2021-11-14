/*
** EPITECH PROJECT, 2019
** my_params_to_list
** File description:
** task01
*/

#include "include/mylist.h"
#include <stdio.h>
#include <stdlib.h>

int *my_put_list(linked_list_t **list, void *data)
{
    linked_list_t *element;

    element = malloc(sizeof(linked_list_t));
    element->data = data;
    element->next = *list;
    *list = element;
    return (0);
}

linked_list_t *my_params_to_list(int ac, char *const *av)
{
    linked_list_t *list;
    int i = 0;

    list = NULL;
    while (i < ac)
    {
        my_put_list(&list, av[i]);
        i++;
    }
    return (list);
}