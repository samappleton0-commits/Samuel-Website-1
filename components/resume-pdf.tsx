import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'


const styles = StyleSheet.create({

  page: {

    padding: 40,

    fontSize: 11,

    lineHeight: 1.5,

  },


  name: {

    fontSize: 20,

    fontWeight: 'bold',

    marginBottom: 5,

  },


  title: {

    fontSize: 12,

    marginBottom: 15,

  },


  section: {

    marginTop: 15,

    marginBottom: 8,

    fontSize: 14,

    fontWeight: 'bold',

  },


  item: {

    marginBottom: 10,

  },


  bold: {

    fontWeight: 'bold',

  },


})





type Props = {

  profile:any

  education:any[]

  experience:any[]

  skills:any[]

  references:any[]

}




export default function ResumePDF({

  profile,

  education,

  experience,

  skills,

  references,

}:Props){


  return (

    <Document>


      <Page
        size="A4"
        style={styles.page}
      >


        <Text style={styles.name}>

          {profile.full_name}

        </Text>



        <Text style={styles.title}>

          {profile.professional_title}

        </Text>




        <Text>

          Address: {profile.address}

        </Text>


        <Text>

          Email: {profile.email}

        </Text>


        <Text>

          Contact: {profile.phone_one} / {profile.phone_two}

        </Text>







        <Text style={styles.section}>

          Career Objective

        </Text>


        <Text>

          {profile.objective}

        </Text>








        <Text style={styles.section}>

          Education Background

        </Text>



        {
          education.map(item => (

            <View
              key={item.id}
              style={styles.item}
            >

              <Text style={styles.bold}>

                {item.qualification}

              </Text>


              <Text>

                {item.institution}

              </Text>


              <Text>

                {item.location}

              </Text>


              <Text>

                {item.start_date} - {item.end_date}

              </Text>


              {
                item.description && (

                  <Text>

                    {item.description}

                  </Text>

                )
              }


            </View>


          ))
        }








        <Text style={styles.section}>

          Work Experience

        </Text>




        {
          experience.map(item => (

            <View
              key={item.id}
              style={styles.item}
            >

              <Text style={styles.bold}>

                {item.position}

              </Text>


              <Text>

                {item.company}

              </Text>


              <Text>

                {item.location}

              </Text>


              <Text>

                {item.start_date} - {item.end_date}

              </Text>


              {
                item.description && (

                  <Text>

                    {item.description}

                  </Text>

                )
              }


            </View>

          ))
        }








        <Text style={styles.section}>

          Skills

        </Text>




        {
          skills.map(skill => (

            <Text key={skill.id}>

              • {skill.name}

            </Text>

          ))
        }









        <Text style={styles.section}>

          References

        </Text>





        {
          references.map(item => (

            <View
              key={item.id}
              style={styles.item}
            >


              <Text style={styles.bold}>

                {item.name}

              </Text>


              <Text>

                {item.position}

              </Text>


              <Text>

                {item.organization}

              </Text>


              <Text>

                {item.location}

              </Text>


              <Text>

                Tel: {item.phone}

              </Text>


            </View>


          ))
        }




      </Page>


    </Document>

  )

}