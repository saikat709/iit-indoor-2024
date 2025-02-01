import  { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import useFetch from '../context/hooks/usefetch';
import Loader from '../components/Loader';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'col',
    backgroundColor: '#E4E4F4', // #E4E4E4
    padding: 20,
  },
  section: {
    margin: 18,
    padding: 18,
    paddingTop: 10,
    marginTop: 10,
    flexGrow: 1
  },
  heading: {
    alignSelf:'center',
    fontSize: 25,
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#01010F',
    marginBottom: 12,
  },
  gameTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textDecoration: 'underline',
    textDecorationColor: 'gray',
    marginBottom: 8,
  },
  teamTitle: {
    fontWeight: 'semibold',
    fontSize: 13,
    display: 'flex',
    gap: '1rem',
  },
  playerContainer: {

  },
  player: {
    fontWeight: 'normal',
    fontSize: 12,
  }
});

// Create Document Component
function PdfDocument( { games } ){
    // useEffect( ()=>{
    //     console.log(games);
    // }, []);

    const pdfContent = games.map( game => {

        const teamContent = game.teams.map( ( team, ind ) => {

            const isAccepted = team.status == 'accepted' ;

            const playersContent = team.players.map( player =>{
                return (
                    <Text key={ player.id } style={styles.player}> {" "}
                        {" ".repeat(10) + "--" } { player.name } 
                        { " ".repeat(3) + "--" } { player.email } 
                        { " ".repeat(3) + "--" } { player.batch } 
                    </Text>
                );
            })
            return ( 
                <p style={{
                    marginBottom: 10,
                }}>
                    <Text key={team.id} style={{
                        ...styles.teamTitle,
                        color: isAccepted ? 'green' : 'red',
                    }}> {" ".repeat(3) + `${ind+1}* `} { team.name || "(No Name Provided)" } {" -> "} { team.number } </Text>
                        { playersContent }
                </p>
            )
        });

        return ( 
            <div key={game.id} >
                <Text style={ styles.gameTitle } >
                    {"# "} {game.name}  {" "}
                    (<View style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <Text style={{color:'green'}}> { game.teams.filter( t => t.status == 'accepted').length } </Text> 
                        <Text> + </Text>
                        <Text style={{color:'red'}}>{ game.teams.filter( t => t.status != 'accepted').length } </Text>
                        <Text> = </Text>
                        <Text style={{color:'black'}}> { game.teams.length } </Text>
                    </View>
                    )
                </Text> 
                { teamContent }
            </div>
        );
    })


    return (
        <Document author='saikat islam' 
                language='en' 
                pageLayout='vertical'
                title='Team Registration Report'
                >
            <Page size="A4" style={styles.page}>
                <Text style={styles.heading}>Teams{" "} </Text>
                <Text style={{
                    fontSize: 12,
                    color: 'green',
                    alignSelf:'center',
                }}> Green is complete Registration. </Text>
                <Text style={{
                    fontSize: 12,
                    color: 'red',
                    alignSelf:'center',
                }}> Red is pending Registration. </Text>
                <View style={styles.section}>
                    { pdfContent }
                </View>
            </Page>
        </Document>
    );
}

export default function PdfOfRegistrations(){
    const [isLoading, setIsLoading ] = useState(false);
    const api = useFetch();
    // const [ teams, setTeams ] = useState([]);
    const [ games, setGames ] = useState([]);
    const location = useLocation();




    const getGames = ()=>{
        setIsLoading(true);
        api.getGames().then( res => res.json() )
        .then( data => {
            setGames(data);
            // console.log("games: ", data);
            setIsLoading(false);
        })
        .catch( err=>{
            const response = window.confirm("err");
            setIsLoading(false);
        })
    }

    // const getTeams = ()=>{
    //     setIsLoading(true);
    //     api.getTeams().then( res => res.json() )
    //     .then( data => {
    //         setTeams(data);
    //         // console.log("TEAMS: ", data);
    //         setIsLoading(false);

    //     })
    //     .catch( err => {
    //         const response = window.confirm("err");
    //         setIsLoading(false);
    //     })
    // }

    useEffect( ()=>{
        getGames();
        // getTeams();

    }, []);

    const content = (<>
        <div className='flex-1 flex flex-col gap-2 justify-center h-[90vh] p-1'>
            <h1 className='text-lg text-white font-bold underline underline-offset-8 mb-2'>Pdf report of registered teams </h1>
            <PDFViewer className='w-full flex-grow'>
                <PdfDocument games={games}/>
            </PDFViewer>
            <div className='flex mt-4 flex-row justify-start gap-1 mb-2'>
                <Link to={'/moderator'} replace className='btn btn-secondary btn-circle mx-4 w-1/3'> Back </Link>
                <button className='btn mx-4 w-1/3 btn-circle btn-secondary'
                        onClick={ ()=>{
                            alert("Please find for a 'Print', 'Save' or 'Download' button from the top-right menu options of the pdf view.")
                }}
                >Download Pdf</button>
            </div>
        </div>
    </>)
    
    return (
        !location.state?.fromLink
            ? <Navigate to={'/404'} replace ></Navigate>
            : <div className='flex justify-center items-center'>
                { (!isLoading && games.length==0) ? 
                    <h1 className='error text-lg fond-bold'>Data not found.</h1>  
                    :  isLoading ?
                        <Loader/> 
                        :  content 
                }
            </div>
    );
}