#!/usr/bin/env python3
"""Independent mathematical checks; stdlib only, no generator import.
Semantic option judgements are documented separately in REVIEW.md.
This is not an automatic proof of verbal uniqueness or psychometric validity.
"""
import json, hashlib, math
from pathlib import Path
from fractions import Fraction as F
from itertools import product, permutations
P=Path(__file__).resolve().parent.parent
source=(P/'docs/practice-targeted-v035.js').read_bytes()
assert hashlib.sha256(source).hexdigest()=='47d3d0b40689dffd9a3792ff6c7f3395a10b769c677ce08be4ad70b9e4741564'
raw=source.decode().split('  const data = ',1)[1].split(';\n  const errors =',1)[0].encode();data=json.loads(raw)
Q={q['id']:q for q in data['questions']}; out={}
def check(group,n,letter,evidence):
    key=f't35-{group}-{n:02d}'
    assert Q[key]['answer']==ord(letter)-65,(key,letter,Q[key]['answer'])
    out[key]={'answer':letter,'evidence':evidence}
# Face normals, actively rotated in a right-handed (east,north,up) basis.
init=((0,0,1),(0,0,-1),(1,0,0),(-1,0,0),(0,1,0),(0,-1,0))
labels='甲乙丙丁戊己'
def rot(v,op):
    x,y,z=v
    return {'E':(z,y,-x),'W':(-z,y,x),'N':(x,z,-y)}[op]
def state(seq):
    vs=init
    for op in seq: vs=tuple(rot(v,op) for v in vs)
    return vs
def at(s,v):return labels[s.index(v)]
up=(0,0,1); north=(0,1,0); east=(1,0,0)
assert at(state('E'),up)=='丁';check('spatial-transform',1,'D',str(state('E')))
assert at(state('N'),north)=='甲';check('spatial-transform',2,'C',str(state('N')))
assert at(state('EN'),up)=='己';check('spatial-transform',3,'D',str(state('EN')))
assert [at(state(s),up) for s in ['EN','NE']]==['己','丁'];check('spatial-transform',4,'C','EN/NE tops: 己/丁')
assert at(state('ENW'),up)=='甲' and state('ENW')!=init
check('spatial-transform',5,'B',str(state('ENW')))
seen={init};stack=[init]
while stack:
    s=stack.pop()
    for op in 'ENW':
        t=tuple(rot(v,op) for v in s)
        if t not in seen:seen.add(t);stack.append(t)
filtered=[s for s in seen if at(s,up)=='甲' and at(s,north)=='戊']
assert len(seen)==24 and filtered==[init]
check('spatial-transform',6,'C','BFS: 24 proper orientations; exactly one has 甲 up and 戊 north')
# Enumerate intersections with 12 edges using exact rational coordinates.
def cut(a,c):
    points=set()
    for axis in range(3):
        other=[i for i in range(3) if i!=axis]
        for ends in product([F(0),F(2)],repeat=2):
            p=[F(0)]*3
            for i,v in zip(other,ends):p[i]=v
            rhs=c-sum(a[i]*p[i] for i in other)
            if a[axis]:
                p[axis]=rhs/a[axis]
                if 0<=p[axis]<=2:points.add(tuple(p))
            elif rhs==0:
                for end in [F(0),F(2)]:p[axis]=end;points.add(tuple(p))
    # Angle-sort in an orthonormal basis of the plane, then exact squared edges/dots.
    pts=list(points);norm=math.sqrt(sum(x*x for x in a));n=[float(x)/norm for x in a]
    ref=[1,0,0] if abs(n[0])<0.9 else [0,1,0]
    def cross(u,v):return [u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]
    u=cross(n,ref);l=math.sqrt(sum(x*x for x in u));u=[x/l for x in u];v=cross(n,u)
    center=[sum(p[i] for p in pts)/len(pts) for i in range(3)]
    def angle(p):
        d=[float(p[i]-center[i]) for i in range(3)]
        return math.atan2(sum(d[i]*v[i] for i in range(3)),sum(d[i]*u[i] for i in range(3)))
    pts.sort(key=angle)
    es=[tuple(pts[(i+1)%len(pts)][j]-p[j] for j in range(3)) for i,p in enumerate(pts)]
    lengths=[sum(x*x for x in e) for e in es]
    dots=[sum(es[i][j]*es[(i+1)%len(es)][j] for j in range(3)) for i in range(len(es))]
    return pts,lengths,dots
for i,a,c,ans,expected in [(7,[1,0,0],1,'B',[4]*4),(8,[1,1,0],2,'A',[4,4,8,8]),(9,[1,1,1],1,'A',[2]*3),(10,[1,1,1],3,'D',[2]*6),(11,[1,1,1],F(5,2),'B',[F(1,2)]*3+[F(9,2)]*3)]:
    pts,lens,dots=cut(a,F(c));assert sorted(lens)==sorted(expected)
    if i in [7,8]:assert set(dots)=={0}
    if i==10:assert len(set(dots))==1
    check('spatial-transform',i,ans,{'vertices':str(pts),'squared_edges':str(lens),'edge_dots':str(dots)})
check('spatial-transform',12,'A','Six supporting faces give at most six sides; x+y+z=3 attains six (checked above).')
# Periods enumerated directly, rather than relying only on formulas.
assert ['甲乙丙丁戊己'[d%6] for d in range(25)][-1]=='甲';check('period-schedule',1,'A','zero-based index 24 -> 甲')
common=[d for d in range(1,49) if d%6==d%8==0];assert common[0]==24;check('period-schedule',2,'B',common)
assert 100%7==2;check('period-schedule',3,'C','Monday + 2 days = Wednesday')
dates=[d for d in range(31) if d%4==0 or d%6==0];assert len(dates)==11;check('period-schedule',4,'D',dates)
dates=[d for d in range(1,61) if d>=5 and (d-2)%6==0 and (d-5)%9==0];assert dates==[14,32,50];check('period-schedule',5,'D',dates)
# Endpoints are integral; per-unit segment midpoint has constant indicator.
on=[s for s in range(180) if (F(2*s+1,2)%90)<40 and 30<=(F(2*s+1,2)%60)<60];assert len(on)==40;check('period-schedule',6,'B',on)
ms=[max(2+tails[0],4+tails[1]) for tails in permutations([4,7])];assert min(ms)==9;check('period-schedule',7,'C',ms)
dur={'A':3,'B':5,'C':4,'D':2,'E':3};parents={'A':[],'B':[],'C':['A'],'D':['A','B'],'E':['C','D']};finish={}
for j in dur:finish[j]=dur[j]+max([finish[p] for p in parents[j]] or [0])
assert max(finish.values())==10;check('period-schedule',8,'B',finish)
loads=[max(sum(v for v,b in zip([7,6,5,4],bits) if b),sum(v for v,b in zip([7,6,5,4],bits) if not b)) for bits in product([0,1],repeat=4)]
assert min(loads)==11;check('period-schedule',9,'D',loads)
# Allow independent orders on each machine, not just permutation schedules.
jobs={'甲':(3,5),'乙':(4,2),'丙':(2,4)};flows=[]
for order1 in permutations(jobs):
    t=0;r={}
    for j in order1:t+=jobs[j][0];r[j]=t
    for order2 in permutations(jobs):
        t=0
        for j in order2:t=max(t,r[j])+jobs[j][1]
        flows.append((order1,order2,t))
assert min(x[2] for x in flows)==13
check('period-schedule',10,'A',{'minimum':13,'all_36_orders':flows,'lower_bound':'earliest stage-2 start 2 + total stage-2 load 11 = 13'})
# Enumerate all serial manual-operation orders. For a fixed order, earliest starts dominate.
model=[]
for order in permutations(['M1','M2','P1','P2']):
    if any(order.index('M'+k)>order.index('P'+k) for k in ['1','2']):continue
    t=0;release={};spans=[]
    for op in order:
        if op[0]=='M':s=t;t+=3;release[op[1]]=t+6
        else:s=max(t,release[op[1]]);t=s+2
        spans.append((op,s,t))
    model.append((order,t,spans))
assert min(x[1] for x in model)==14;check('period-schedule',11,'A',model)
loads=[max(sum(4 for b in bits if b),sum(4 for b in bits if not b)) for bits in product([0,1],repeat=3)]
assert min(loads)==8;check('period-schedule',12,'C',loads)
# Exact weighted arithmetic and explicit distributions respecting all counts.
a=F(800*4+200*12,1000);b=F(200*3+800*10,1000)
assert a==F(28,5);check('group-statistics',1,'B',str(a))
assert b-a==3;check('group-statistics',2,'D',str(b-a))
f=F(800,1000)*3+F(200,1000)*10;assert f==F(22,5);check('group-statistics',3,'B',str(f))
# Online B: one 5-minute and 199 equal 595/199-minute cases averages 3, yet 5>4.
online=[F(5)]+[F(595,199)]*199;assert sum(online)/200==3 and max(online)>4
# Onsite B: 600 cases at 8 and 200 at 16 averages 10, but median 8.
onsite=[8]*600+[16]*200;assert sum(onsite)==8000 and (onsite[399]+onsite[400])/2==8
check('group-statistics',4,'C',{'total':8000,'A_counterexample':'A all 4; B one 5 and 199 at 595/199','B_counterexample':'600 at 8 and 200 at 16, median 8','D':'unobserved case mix can differ without efficiency changing'})
assert F(40+35,100)==F(3,4);check('group-statistics',5,'A','3/4')
assert 40<50<=51<=75;check('group-statistics',6,'D','ranks 50,51 both in [2,4)')
counts=[40,35,15,10];lower=[0,2,4,6];upper=[2,4,6,8]
lo=sum(F(n)*x for n,x in zip(counts,lower))/100;hi=sum(F(n)*x for n,x in zip(counts,upper))/100
assert (lo,hi)==(F(19,10),F(39,10))
check('group-statistics',7,'D',{'lower':str(lo),'supremum':str(hi),'attainment':'lower attained; first 90 cases strictly below upper endpoints, so upper unattainable','counterexample':'all lower endpoints -> 1.9 rejects A,B,C'})
assert round(float(F(95,120)*100),1)==79.2;check('group-statistics',8,'C','95/120=19/24')
a=F(90+108,300);b=F(120+99,300);assert a==F(33,50);check('group-statistics',9,'A',str(a))
assert (b-a)*100==7;check('group-statistics',10,'C','7 percentage points')
f=F(120,300)*F(120,150)+F(180,300)*F(99,150);assert f==F(179,250) and b-f==F(7,500)
check('group-statistics',11,'A',{'fixed':str(f),'actual':str(b),'difference_pp':str(100*(b-f))})
assert 219-198==21
check('group-statistics',12,'B','Disjoint respondent cohorts satisfy every table count while no matched individual change is observable. Even with matched cohorts, 31 gains and 10 losses give net +21.')
assert len(out)==36
# Checks here do not pretend to infer language answers from stored keys.
for q in Q.values():
    assert len(q['options'])==len(set(q['options']))==4
    assert len(q['optionReviews'])==4
    assert q['meta']['difficulty']['level'] is None
    assert q['explanation']==q['optionReviews'][q['answer']]
for m in data['materials']:
    for q in Q.values():
        if m['id'] in q['materialIds']:assert m['text'] in q['stem']
report={'source_sha256':hashlib.sha256(raw).hexdigest(),'mathematical_questions_checked':36,'semantic_review':'REVIEW.md covers all 48 questions and 192 options; language review is not machine proof','results':out}
(P/'test-results').mkdir(exist_ok=True)
(P/'test-results'/'v035-math-independent-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='results'},ensure_ascii=False))
