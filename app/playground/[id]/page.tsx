"use client"

import { usePlayground } from "@/modules/playground/hooks/usePlayground"
import { useParams } from "next/navigation"
import React from 'react'

function MainDashboardPage() {
    const {id}=useParams<{id:string}>()
    const {playgroundData , templateData , isLoading , error , saveTemplateData} = usePlayground(id)
    console.log("playgroundData" , playgroundData)
    console.log("templateData" , templateData)
    
  return (
    <div>Page ID: {id}</div>
  )
}

export default MainDashboardPage