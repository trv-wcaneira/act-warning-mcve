# act-warning-mcve

This was a quick MCVE (Minimal, Complete, Verifiable example) to demonstrate what I think could be a bug/unexpected behavior in either React 18 or RTL 13.4.  OTOH, it could just be that I'm doing it wrong<sup>TM</sup>. :-)

## Background

From what little I understand, the infamous "act warning" can occur for a couple [different reasons]().  [This article]() is also a decent read.  

My understanding is that React's DOM updates need to occur within React's call stack.  If they do not, because a state update is initiated outside React somehow, or occurs AFTER a React is 