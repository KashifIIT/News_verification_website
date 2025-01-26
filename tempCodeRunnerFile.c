#include<stdio.h>

int main() {
    int a = 6, b = 7 ;
    float c = b/a ; 
    printf("%d %d %f", a,b,c); 
    
    /*Output 6 7 1.000000 ( Why 1? - bcz it will
    remove all the fractional part from it.*/
    
    return 0;
}