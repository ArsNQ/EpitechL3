##
## EPITECH PROJECT, 2019
## Makefile
## File description:
## task01
##

SRC		=	my_putchar.c	\
			my_putstr.c		\
			my_put_nbr.c	\
			my_getnbr.c 	\
			my_strlen.c		\
			main.c

OBJ 	= 	$(SRC:.c=.o)

NAME 	= 	do-op

all:		$(NAME)

$(NAME):	$(OBJ)
			gcc -o $(NAME) $(OBJ)

clean:
			rm -f *.o

fclean: 	clean
			rm -f $(NAME)

re:			fclean all