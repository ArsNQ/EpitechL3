/*
** EPITECH PROJECT, 2019
** btree_create_node
** File description:
** task01
*/

#include "include/btree.h"
#include <stdlib.h>
#include <stdio.h>

btree_t *btree_create_node(void *item)
{
    btree_t *node = malloc(sizeof(btree_t));

    node->item = item;
    node->left = 0;
    node->right = 0;

    return (node);
}