/*
** EPITECH PROJECT, 2019
** btree_apply_suffix
** File description:
** task04
*/

#include <stdlib.h>
#include <stdio.h>
#include "include/btree.h"

void btree_apply_suffix(btree_t *root, int (*applyf)(void *))
{
    if (root != NULL)
    {
        btree_apply_suffix(root->left, *applyf);
        btree_apply_suffix(root->right, *applyf);
        (*applyf)(root->item);
    }
}