/*
** EPITECH PROJECT, 2019
** btree
** File description:
** btree
*/

#ifndef MY_LIBRARY
#define MY_LIBRARY

typedef struct btree
{
    struct btree *left;
    struct btree *right;
    void *item;
} btree_t;

btree_t *btree_create_node(void *item);
void btree_apply_prefix(btree_t *root, int (*applyf)(void *));
void btree_apply_infix(btree_t *root, int (*applyf)(void *));
void btree_apply_suffix(btree_t *root, int (*applyf)(void *));

#endif