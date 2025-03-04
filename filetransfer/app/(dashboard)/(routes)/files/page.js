import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Files() {
  return (
    <div>Files
      <UserButton afterSignOutRedirectUrl="/" />
    </div>
  );
}

export default Files;
