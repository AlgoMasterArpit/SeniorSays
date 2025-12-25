// 1. The Problem: "Infinite Stretching" ↔️
// If you just write <div>Hello</div> in React, it takes up 100% of the screen width.

// On a phone: It looks fine.

// On a standard laptop: It looks okay.

// On a Gaming Monitor / Ultrawide: Your website content stretches too wide. The text lines become so long that they are hard to read.

import React from 'react'

function Container({ children }) {
  // logic: 
  // 1. w-full: Be wide on small phones.
  // 2. max-w-7xl: STOP stretching if the screen gets bigger than 7xl size.
  // 3. mx-auto: If there is extra space on left/right, equalize it (Center the component).
  // 4. px-4: Don't let text touch the exact edge of the screen on phones.

  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}

export default Container


// You created it so you don't have to write className='w-full max-w-7xl mx-auto px-4' five hundred times in every single file.
//  You write it once in Container.jsx, and simply wrap your content with <Container>...</Container> everywhere else.