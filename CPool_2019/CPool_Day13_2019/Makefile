##
## EPITECH PROJECT, 2019
## Makefile
## File description:
## task01
##

SRC		=	btree_create_node.c 	\
			btree_apply_prefix.c 	\
			btree_apply_infix.c 	\
			btree_apply_suffix.c

OBJ 	= 	$(SRC:.c=.o)

NAME 	= 	libbtree.a

all:		$(NAME)

$(NAME):	$(OBJ)
			ar rc $(NAME) $(OBJ)

clean:
			rm -f *.o

fclean: 	clean
			rm -f $(NAME)

re:			fclean all