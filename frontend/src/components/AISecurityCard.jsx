import { useState } from "react";


function AISecurityCard(){

  const [password,setPassword] = useState("");
  const [result,setResult] = useState(null);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);



  const analyzePassword = async()=>{


    if(!password){

      setError("Please enter a password");

      return;

    }


    try{


      setLoading(true);
      setError("");
      setResult(null);



      const response = await fetch(

        "http://127.0.0.1:8000/ai/analyze",

        {

          method:"POST",

          headers:{

            "Content-Type":"application/json"

          },


          body:JSON.stringify({

            password:password

          })


        }

      );



      if(!response.ok){

        throw new Error("API request failed");

      }



      const data = await response.json();


      setResult(data);



    }

    catch(error){

      console.log(error);

      setError(
        "Unable to analyze password. Check backend server."
      );


    }

    finally{

      setLoading(false);

    }


  };





  return (

    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">


      <h2 className="text-2xl font-bold mb-5">

        🤖 AI Password Security Analyzer

      </h2>





      <input


      type="password"


      placeholder="Enter password to analyze"


      className="border p-3 rounded w-full mb-4"


      value={password}


      onChange={(e)=>setPassword(e.target.value)}


      />






      <button


      onClick={analyzePassword}


      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"


      >

      {

      loading

      ?

      "Analyzing..."

      :

      "Analyze Password"

      }


      </button>





      {
        error &&

        <p className="text-red-600 mt-4 font-semibold">

          {error}

        </p>
      }






      {


      result &&


      <div className="mt-6">





        <h3 className="text-xl font-bold">

          Security Score:

          <span className="ml-2">

          {result.score ?? 0}/100

          </span>

        </h3>





        <div className="w-full bg-gray-200 rounded-full h-4 mt-3">


          <div


          className="bg-green-600 h-4 rounded-full"


          style={{

            width:`${result.score ?? 0}%`

          }}


          >


          </div>


        </div>







        <p className="mt-4 text-lg">


          Level:

          <span className="font-bold ml-2">


          {result.level ?? "Unknown"}


          </span>


        </p>







        <h3 className="font-bold mt-5">

          ⚠ Issues

        </h3>




        {

        result?.issues?.length > 0

        ?

        (

        <ul className="list-disc ml-6">


        {

        result.issues.map((issue,index)=>(


          <li key={index}>

            {issue}

          </li>


        ))

        }


        </ul>

        )

        :

        (

        <p className="text-green-600">

          No security issues detected 🎉

        </p>

        )


        }









        <h3 className="font-bold mt-5">

          💡 Suggestions

        </h3>





        {

        result?.suggestions?.length > 0

        ?

        (

        <ul className="list-disc ml-6">


        {

        result.suggestions.map((item,index)=>(


          <li key={index}>

            {item}

          </li>


        ))

        }


        </ul>

        )

        :

        (

        <p>

          Your password looks good.

        </p>

        )


        }





      </div>


      }





    </div>


  );

}


export default AISecurityCard;