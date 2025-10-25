// 'use client';

// import { Button, Container, Title, Text, Center } from '@mantine/core';
// import { useRouter } from 'next/navigation';

// export default function StartTest({testCategories: Testcategories[]}) {
//   const router = useRouter();

//   const handleStart = () => {
//     router.push('/test/start');
//   };

//   return (
//      <Container size="lg" py={40}>
//       <Title order={2}  mb={30}>
//         {t.test_title || 'Hukuk bilimleriňizi synagdan geçiriň'}
//       </Title>

//       <Grid>
//         {testCategories.map((category) => (
//           <Grid.Col key={category.id} span={{ base: 12, sm: 6, md: 4 }}>
//             <Card shadow="sm" padding="lg" radius="md" withBorder className="hover:shadow-lg transition duration-300">
//               <Title order={4} mb={10}>
//                 {category.title}
//               </Title>

//               <Text size="sm" c="dimmed" mb="md">
//                 {category.description || t.test_description || 'Bu kategoriýa degişli hukuk sowallary bilen synagdan geçiň.'}
//               </Text>

//               <Button fullWidth onClick={() => router.push(`/test/${category.id}`)}>
//                 {t.start || 'Başla'}
//               </Button>
//             </Card>
//           </Grid.Col>
//         ))}
//       </Grid>
//     </Container>
//   );
// }
