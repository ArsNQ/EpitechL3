##
## EPITECH PROJECT, 2019
## makefile
## File description:
## makefile
##

SRC	=	my_getnbr.c \
		my_putchar.c \
		my_putstr.c \
		my_strlen.c	\
		eval_expr.c	\
		my_signe.c	\
		my_strtol.c	\
		addition.c	\
		soustraction.c	\
		my_revstr.c	\
		my_charcat.c	\
		my_strcpy.c	\
		infin.c	\
		affichage.c	\
		other_base.c	\
		simple_operation.c	\
		my_put_nbr.c	\
		main.c

OBJ	= 	$(SRC.c=.o)

NAME =	calc

all:	compil

compil:
	gcc -o $(NAME) $(SRC) -I./include

clean:
	rm -f $(OBJ)

fclean:	clean
	rm -f $(NAME)

re:	fclean all
