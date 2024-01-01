<script lang="ts" setup>
const activeSection = ref<string | null>(null)

function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId)
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    })
    activeSection.value = sectionId
  }
}

onMounted(() => {
  // Set initial active section on page load
  setActiveSection()
  // Listen to scroll events to update active section
  window.addEventListener('scroll', setActiveSection)
})

function setActiveSection() {
  const sections: NodeListOf<HTMLElement> = document.querySelectorAll('.section')
  const scrollPosition = window.scrollY + window.innerHeight / 2

  sections.forEach((section) => {
    if (
      scrollPosition >= section.offsetTop
      && scrollPosition <= section.offsetTop + section.offsetHeight
    )
      activeSection.value = section.id
  })
}
</script>

<template>
  <main class=" min-h-screen ">
    <div class="">
      <img src="https://img.freepik.com/free-vector/professional-chefs-cooking-culinary-chefs-hand-drawn-sketch-vector-illustration_460848-14929.jpg?w=1060&t=st=1704117808~exp=1704118408~hmac=508202a9fea6673d812f6a6782dbc38255a29dc6366e6bb4c3c3383356bc0d31" alt="drawing of a big chef" class=" w-1/2 object-cover">
      <h1 class="text-6xl font-extrabold  text-center ">
        About Don't Trust Skinny Cooks
      </h1>

      <div class="p-2 flex items-center justify-center ">
        <ul class="flex gap-2 text-xl">
          <li>
            <button :class="{ active: activeSection === 'who-we-are' }" @click="scrollToSection('who-we-are')">
              About
            </button>
          </li>
          <li>
            <button :class="{ active: activeSection === 'history' }" @click="scrollToSection('history')">
              History
            </button>
          </li>
          <li>
            <button :class="{ active: activeSection === 'recipe-development-testing' }" @click="scrollToSection('recipe-development-testing')">
              Recipes
            </button>
          </li>
          <li>
            <button :class="{ active: activeSection === 'contact' }" @click="scrollToSection('contact')">
              Contact
            </button>
          </li>
          <li>
            <button :class="{ active: activeSection === 'advertise-with-us' }" @click="scrollToSection('advertise-with-us')">
              Advertise
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex gap-5 justify-center">
      <article class="prose lg:prose-xl w-auto">
        <section id="who-we-are">
          <h2>Who We Are</h2>
          <p>Don't Trust Skinny Cooks is dedicated to making your cooking experience delightful by providing a platform for sharing and exploring a diverse range of recipe ideas. Our mission is to alleviate the stress associated with cooking and infuse more joy into your culinary journey.</p>
          <p>Established in [Year], Don't Trust Skinny Cooks started as a passion project, inspired by the founder's love for creative recipes. Today, it has evolved into a thriving community-driven platform with a collection of over [Number] tested recipes, tips, and meal plans. We proudly engage with a community of enthusiastic home cooks, supported by a talented team of recipe developers, writers, testers, and creative professionals.</p>
        </section>

        <section id="history">
          <h2>Our History</h2>
          <p>Founded in [Year] by [Founder's Name], Don't Trust Skinny Cooks began as a personal endeavor to document and share innovative recipes. What started as a passion project has now grown into a dynamic community-driven platform.</p>
          <p>[Founder's Name] initially embarked on this culinary journey during a period of [describe the founder's experience, e.g., personal health challenges, work stress, etc.]. The blog, born out of a desire to make cooking enjoyable, has transformed into a comprehensive resource with a diverse array of recipes and cooking advice.</p>
          <p>In [Year of Acquisition], Don't Trust Skinny Cooks became part of [Acquiring Company's Name], marking a new chapter in our journey to provide culinary inspiration to a global audience.</p>
        </section>

        <section id="recipe-development-testing">
          <h2>Recipe Development & Testing</h2>
          <p>At Don't Trust Skinny Cooks, we take pride in our commitment to delivering recipes that not only work flawlessly but also bring joy to your kitchen. Our approach to recipe development and testing revolves around three key principles:</p>
          <ol>
            <li><strong>Functionality:</strong> Every recipe must be easy to follow, ensuring reliable results every time.</li>
            <li><strong>Deliciousness:</strong> We create dishes that bring smiles inside and out, making you want to savor every bite.</li>
            <li><strong>Worth the Effort:</strong> Our recipes are designed to be repeat-worthy, ensuring you'll want to make them again and again.</li>
          </ol>
          <p>To uphold these standards, we collaborate with expert recipe developers who not only excel in their kitchens but also ensure the recipes work seamlessly in yours. Each recipe undergoes a meticulous review and editing process in-house, followed by testing in real home kitchens by our dedicated team. Only after meeting our stringent criteria is a recipe shared on Don't Trust Skinny Cooks.</p>
        </section>

        <section id="contact">
          <h2>Contact Us</h2>
          <p>We value your feedback and welcome any inquiries or comments you may have. Whether you want to share your thoughts on a recipe, have an idea to contribute, or simply wish to get in touch, feel free to reach out to us:</p>
          <p><strong>Email:</strong> contact@donttrustskinnycooks.com</p>
          <p>For press inquiries, please email us at press@donttrustskinnycooks.com.</p>
          <p>If you suspect fraudulent activities related to job postings, please contact us at security@donttrustskinnycooks.com.</p>
          <p>For valid work opportunities with our site, please refer to our job openings or submit pitches to write@donttrustskinnycooks.com.</p>
        </section>
        <section id="advertise-with-us">
          <h2>Advertise With Us</h2>
          <p>Don't Trust Skinny Cooks offers a unique opportunity for advertisers to reach a diverse and engaged audience passionate about culinary exploration. Our platform provides the highest value to advertisers through a combination of scale, credibility, and user intent.</p>
          <p>If you are interested in advertising with us, please contact our advertising team:</p>
          <p><strong>Email:</strong> advertise@donttrustskinnycooks.com</p>
          <p>For more information about our advertising options and to view our media kit, visit our <a href="your-advertise-page-url" target="_blank">Advertise With Us</a> page.</p>
        </section>
      </article>
    </div>
  </main>
</template>

<style>

</style>
