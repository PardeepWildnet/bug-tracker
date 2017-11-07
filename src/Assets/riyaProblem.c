/******************************************************************************

                            Online C Compiler.
                Code, Compile, Run and Debug C program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include<stdio.h>
#include<string.h>

int main()
{
    int check, i, start = 0, end;
    char convertedString[25];
    char original[25];
    printf("enter the converted string");
    gets(convertedString);
    if(strlen(convertedString)%2==0)
    {
        check = 0;
    }
    else
    {
        check = 1;
    }
    for(i=0;i<strlen(convertedString);i++)
    {
        if(check==0)
        {
            original[strlen(original)] = convertedString[i];
            check = 1;
        }
        else
        {
            for(int k = 0; k<strlen(original);k++)
            {
                original[strlen(original+1)] = original[strlen(original)]
            }
            original[0] = convertedString[i];
            check = 0;
        }
    }
    return 0;
}



