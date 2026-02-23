"use server"

import { db } from "@/lib/db"
import { currentUser } from "@/modules/auth/actions"

import { revalidatePath } from "next/cache"

export const toggleStarMarked = async (
  playgroundId: string,
  isChecked: boolean
) => {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    throw new Error("User Id is Required");
  }

  try {
    if (isChecked) {
      await db.starMark.create({
        data: {
          userId: userId!,
          playgroundId,
          isMarked: isChecked,
        },
      });
    } else {
        await db.starMark.delete({
        where: {
          userId_playgroundId: {
            userId,
            playgroundId: playgroundId,

          },
        },
      });
    }

     revalidatePath("/dashboard");
    return { success: true, isMarked: isChecked };
  } catch (error) {
       console.error("Error updating problem:", error);
    return { success: false, error: "Failed to update problem" };
  }
};

export const getAllPlaygroundForUser=async()=>{
    const user=await currentUser()

    try {
        const playground=await db.playground.findMany({ 
            where:{
                userId:user?.id
            },
                include:{
                    user:true,
                    Starmark:{
                        where:{
                            userId:user?.id
                        },
                        select:{
                            isMarked:true
                        }    
                    }
                }
        })
        return playground
    } catch (error) {
        console.log("error occurred while fetching playground",error);
        throw error;
    }
}

export const createPlayground=async(data:{
    title:string,
    template:"REACT" | "VUE" | "ANGULAR" | "NEXTJS" | "EXPRESS" | "HONO"
    description?:string
})=>{
    const user=await currentUser()
    const {template,title,description}=data

    try {
        const playground=await db.playground.create({
            data:{
                title:title,
                template:template,
                description:description,
                userId:user?.id!
            }
        })
        return playground
    } catch (error) {
        console.log("error occurred while creating playground",error);
        throw error;
    }
}

export const deletePlaygroundById=async(id:string)=>{
    try {
        await db.playground.delete({
            where:{
                id:id
            }
        })
        revalidatePath("/dashboard")
    } catch (error) {
        console.log("error while deleting playground",error);
        throw error;
    }
}  

export const editPlaygroundById=async(id:string,data:{
    title:string,
    template:"REACT" | "VUE" | "ANGULAR" | "NEXTJS" | "EXPRESS" | "HONO"
    description?:string
})=>{
    

    try {
        await db.playground.update({
            where:{
                id:id
            },
            data:data
        })
        revalidatePath("/dashboard")
    } catch (error) {
        console.log("error while updating playground",error);
        throw error;
    }
}

export const duplicatePlaygroundById=async(id:string)=>{
    try {
        const originalPlayground=await db.playground.findUnique({
            where:{id},
            //todo:add template files
        })
        if(!originalPlayground) throw new Error("Original playground not found")

        const duplicatedPlayground=await db.playground.create({
            data:{
                title:`${originalPlayground.title} (Copy)`,
                template:originalPlayground.template,
                description:originalPlayground.description,
                userId:originalPlayground.userId

                //todo:duplicate template files
            }
        })
        revalidatePath("/dashboard")
        return duplicatedPlayground
    } catch (error) {
        console.log("error while duplicating playground",error);
        throw error;
    }
}