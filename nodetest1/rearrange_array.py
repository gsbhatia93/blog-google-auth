import sys
class Node:
    set=False;
    def __init__(self,val):
        self.val = val;
def getIndex(i):
    for k in range(0,len(a)):
        if (a[k].val == i):
            return k;
def change_logic(i,prev):
    if(prev.set):
        return;
    if(prev==first):
        a[first_index]=prev;
        return;
    prev.set = True;
    next = a[i];
    print prev.val,next.val,i;
    a[i] = prev;
    j=getIndex(i);
    print prev.val,next.val,i,j;
    change_logic(j,next);

array  = [1,2,0];
a=[]
for i in array:
    node=Node(i);
    a.append(node);
for k in a:
    #print k.val,
    pass;
print "";
first = None;
first_index=None;

i=-1;
while(i<len(a)-1):
    first = None;
    first_index=None;
    i=i+1;
    if(a[i].set == False):
        prev=a[a[i].val];
        first = prev;
        first_index = a[i].val;
        change_logic(i,prev);
for k in a:
    print k.val,
