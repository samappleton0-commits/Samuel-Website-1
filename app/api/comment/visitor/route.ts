// =====================================================
// COMMENT VISITOR LOOKUP API
// app/api/comment/visitor/route.ts
// =====================================================


import {
  NextResponse,
} from 'next/server'


import {
  getRememberedVisitor,
} from '@/lib/comment-visitors'



// =====================================================
// GET REMEMBERED VISITOR
// =====================================================


export async function GET(){


  try {


    const visitor =

      await getRememberedVisitor()






    return NextResponse.json({


      success:true,


      visitor:


        visitor

        ?

        {

          name:visitor.name

        }

        :

        null



    })



  }


  catch(error){



    console.error(

      'VISITOR LOOKUP ERROR:',

      error

    )





    return NextResponse.json(


      {


        success:false,


        visitor:null



      }


    )



  }


}