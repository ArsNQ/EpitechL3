##
## EPITECH PROJECT, 2019
## Makefile
## File description:
## task01
##

SRC		=	cat.c

OBJ 	= 	$(SRC:.c=.o)

NAME 	= 	cat

all:		$(NAME)

$(NAME):	$(OBJ)
			gcc -o $(NAME) $(OBJ)

clean:
			rm -f *.o

fclean: 	clean
			rm -f $(NAME)

re:			fclean all