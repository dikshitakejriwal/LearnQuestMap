import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.css';

export default function Test() {
    const [subject, setSubject] = useState("python");
    const [hours, setHours] = useState(10);
    const [resources, setResources] = useState('video')
    const [goal, setGoal] = useState('to become a data scientist')

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    async function onSubmit(event) {
        event.preventDefault();
        if (loading) {
            return;
        }
        try {
            setLoading(true);
            setResult('');
            const response = await fetch('/api/generate-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subject, hours, resources, goal }),
            });
            const data = await response.json();
            setResult(data.result.replaceAll('\n', '<br />'));
        } catch(e) {
            alert("Failed to generate plan! Try Later!")
        } finally {
            setLoading(false);
        }

  }

    return (
        <div>
        <Head>
            <title>OpenAI Quickstart</title>
            <link rel="icon" href="/dog.png" />
        </Head>

        <main className={styles.main}>
            <h3>Generate a Study Plan ☕📚📖✍🎧</h3>
            <form onSubmit={onSubmit}>

            <label>What would you like to learn?</label>
            <input
                type="text"
                name="subject"
                placeholder="Enter a subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />

            <label>Number of hours in a week you can commit</label>
            <input
                type="number"
                min={1}
                max={168}
                name="hours"
                placeholder="Enter numbers of hours"
                value={hours}
                onChange={(e) => setHours(Number.parseInt(e.target.value))}
            />

            <label>How do you prefer learning?</label>
            <select
                name="resources"
                value={resources}
                onChange={(e) => setResources(e.target.value)}
            >
                <option value="video">Video</option>
                <option value="woman">Webpages</option>
                <option value="Video, Webpages, Practice">Video, Webpages, Practice</option>
            </select>


            <label>Why are you learning? Your goal?</label>
            <input
                type="text"
                name="goal"
                placeholder="Enter your goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
            />

            <input type="submit" value="Generate a plan" />
            </form>
            {loading && (
            <div>
                <h3>Looking for the best plan to learn</h3>
                <img src="/loading.gif" className={styles.loading} />
            </div>
            )}
            {result && ( 
            <div className={styles.result} dangerouslySetInnerHTML={{ __html: result }}/>
            )}
           
        </main>
        </div>
  );
}


// import Head from "next/head";
// import { useState } from "react";
// import styles from "./index.module.css";

// export default function Home() {
//   const [subject, setSubject] = useState("python");
//   const [hours, setHours] = useState(10);
//   const [resources, setResources] = useState('video')
//   const [goal, setGoal] = useState('to become a data scientist')

//   const [result, setResult] = useState();

//   async function onSubmit(event) {
//     event.preventDefault();
//     try {
//       const response = await fetch("/api/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ animal: animalInput }),
//       });

//       const data = await response.json();
//       if (response.status !== 200) {
//         throw data.error || new Error(`Request failed with status ${response.status}`);
//       }

//       setResult(data.result);
//       setAnimalInput("");
//     } catch(error) {
//       // Consider implementing your own error handling logic here
//       console.error(error);
//       alert(error.message);
//     }
//   }

//   return (
//     <div>
//       <Head>
//         <title>OpenAI Quickstart</title>
//         <link rel="icon" href="/dog.png" />
//       </Head>

//       <main className={styles.main}>
//         <h3>Generate a Study Plan ☕📚📖✍🎧</h3>
//         <form onSubmit={onSubmit}>
//           <input
//             type="text"
//             name="animal"
//             placeholder="Enter an animal"
//             value={animalInput}
//             onChange={(e) => setAnimalInput(e.target.value)}
//           />
//           <input type="submit" value="Generate names" />
//         </form>
//         <div className={styles.result}>{result}</div>
//       </main>
//     </div>
//   );
// }
