<template>
  <div class="bg-white rounded-[16px] p-6">
    <div v-if="!isLoaded">
      <div class="flex justify-between mb-6">
        <h3 class="text-2xl font-bold leading-7">Empleados</h3>
        <div class="rounded-[100px] h-[34px] w-[100px] bg-culqi-gray-100"></div>
      </div>
      <div class="flex gap-4 mb-6">
        <div v-for="index in 3" :key="index" class="rounded-[100px] w-[344px] h-[36px] bg-culqi-gray-100"></div>
      </div>
      <div class="flex bg-[#FAFAFA] rounded-[10px] overflow-hidden">
        <div v-for="index in 8" :key="index" class="flex py-4 px-4 gap-[10px]">
          <div v-if="index == 1" class="rounded-[100px] w-[20px] h-[20px] bg-culqi-gray-200"></div>
          <div :style="{ width: index === 1 ? '148px' : '67px' }" class="rounded-[100px] h-[20px] bg-culqi-gray-200">
          </div>
          <div v-if="index != 1" class="rounded-[100px] w-[20px] h-[20px] bg-culqi-gray-200"></div>
        </div>
      </div>
      <div v-for="index in 15" class="flex overflow-hidden">
        <div v-for="index in 8" :key="index" class="flex py-4 px-4 gap-[10px] border-b border-culqi-gray-200">
          <div v-if="index == 1" class="rounded-[100px] w-[20px] h-[20px] bg-culqi-gray-100"></div>
          <div :style="{ width: index === 1 ? '148px' : '97px' }" class="rounded-[100px] h-[20px] bg-culqi-gray-100">
          </div>
          <div v-if="index == 6" class="rounded-[100px] w-[20px] h-[20px] bg-culqi-gray-100"></div>
        </div>
      </div>
    </div>

    <div v-else="isLoaded">
      <div class="flex justify-between h-[56px] mb-6">
        <div>
          <h3 class="text-2xl font-bold leading-7 mb-2">Empleados</h3>
          <p class="text-culqi-gray-600 text-base font-medium leading-6">Gestiona tus empleados</p>
        </div>
        <div class="flex gap-[20px]">
          <button
            class="flex justify-center items-center gap-2 w-[150px] text-culqi-gray-900 text-base font-bold leading-6 tracking-wider border border-culqi-gray-900 rounded-[10px]">
            <img src="../assets/icons/file-download.svg" alt="download-icon">Descargar
          </button>
          <button
            class="flex justify-center items-center gap-2 w-[127px] text-white text-base font-bold leading-6 tracking-wider bg-culqi-gray-900 rounded-[10px]">
            <img src="../assets/icons/plus.svg" alt="new-icon">Nuevo
          </button>
        </div>
      </div>

      <div class="flex gap-4">
        <div class="w-[733px] flex border rounded-[10px] h-[54px] py-4 px-5">
          <input v-model="searchQuery" @input="performSearch" class="border-none outline-none w-full text-sm font-normal"
            type="text" placeholder="Buscar empleado">
          <img class="cursor-pointer" src="../assets/icons/search.svg" alt="search-icon">
        </div>

        <div class="w-[315px] h-[54px] relative inline-block border rounded-[10px] py-4 px-5 mb-6">
          <button @click="isOpen = !isOpen"
            class="w-full h-full flex items-center justify-between gap-[10px] text-sm font-medium">
            {{ selectedOption || 'Nombre de cargo' }}
            <img src="../assets/icons/chevron-down.svg" alt="">
          </button>
          <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 z-10"></div>
          <div v-if="isOpen"
            class="absolute z-20 w-full h-[300px] ml-[-20px] mt-5 py-2 bg-white border border-gray-300 rounded shadow-lg overflow-scroll">
            <div v-for="(option, index) in options" :key="index" @click="selectOption(option)"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100">
              {{ option }}
            </div>
          </div>
        </div>
      </div>

      <div class="">
        <table class="min-w-full">
          <caption></caption>
          <thead class="bg-culqi-gray-50">
            <tr class="">
              <th scope="col" class="p-4 text-left text-xs leading-6 font-bold text-culqi-gray-600">
                Nombre
              </th>
              <th scope="col" class="p-4 text-left text-xs leading-6 font-bold text-culqi-gray-600">
                Nombre cargo
              </th>
              <th scope="col" class="p-4 text-left text-xs leading-6 font-bold text-culqi-gray-600">
                Departamento
              </th>
              <th scope="col" class="p-4 text-left text-xs leading-6 font-bold text-culqi-gray-600">
                Oficina
              </th>
              <th scope="col" class="p-4 text-left text-xs leading-6 font-bold text-culqi-gray-600">
                Cuenta
              </th>
              <th scope="col" class="p-4 text-right text-xs leading-6 font-bold text-culqi-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Loop through your data and generate rows -->
            <tr v-for="employee in displayedEmployees[currentPage - 1]" :key="employee.id">
              <td class="px-4 py-4">
                <p class="text-[12px] text-culqi-gray-900 leading-6 font-medium">{{ employee.nombre }}</p>
                <p class="text-[10px] text-culqi-gray-500 font-normal">{{ employee.correo }}</p>
              </td>
              <td class="px-4 py-4 text-[12px] text-culqi-gray-900 leading-6 font-normal">
                {{ employee.cargo }}
              </td>
              <td class="px-4 py-4 text-[12px] text-culqi-gray-900 leading-6 font-normal">
                {{ employee.departamento }}
              </td>
              <td class="px-4 py-4 text-[12px] text-culqi-gray-900 leading-6 font-normal">
                {{ employee.oficina }}
              </td>
              <td class="px-4 py-4 text-[12px] text-culqi-gray-900 leading-6 font-normal">
                {{ employee.estadoCuenta }}
              </td>
              <td class="px-4 py-4 flex gap-[10px] justify-end items-center">
                <img class="cursor-pointer" src="../assets/icons/view.svg" alt="view">
                <img class="cursor-pointer" src="../assets/icons/edit.svg" alt="edit">
                <img class="cursor-pointer" src="../assets/icons/delete.svg" alt="delete">
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="flex items-center justify-between">
        <!-- Flechas de navegación -->
        <div class="flex items-center justify-between">
          <!-- Flechas de navegación -->
          <div class="flex items-center justify-center gap-6">
            <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
              class="w-[32px] h-[32px] border rounded-lg flex justify-center items-center cursor-pointer">
              <img src="../assets/icons/chevron-left.svg" alt="prev">
            </button>
            <div class="flex">
              <p v-for="index in totalPages" @click="changePage(index)"
                class="py-[4px] px-[12.55px] text-xs font-medium leading-6 rounded-[10px] cursor-pointer"
                :class="index === currentPage ? 'bg-culqi-gray-100' : ''">
                {{ index }}
              </p>
            </div>
            <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)"
              class="w-[32px] h-[32px] border rounded-lg flex justify-center items-center cursor-pointer">
              <img src="../assets/icons/chevron-right.svg" alt="next">
            </button>
          </div>
        </div>

        <!-- Dropdown para la cantidad de elementos a mostrar -->
        <div class="flex justify-center items-center gap-4">
          <p class="text-xs font-medium leading-6 text-culqi-gray-600">
            Mostrando {{ (currentPage - 1) * Number(itemsPerPage) + 1 }} a
            {{ Math.min(currentPage * Number(itemsPerPage), employeesData.length) }} de
            {{ employeesData.length }} registros
          </p>
          <select v-model="itemsPerPage" id="itemsPerPage"
            class="text-xs block mt-1 w-[105px] border rounded-[8px] p-[5px]">
            <option value="5">Mostrar 5</option>
            <option value="10">Mostrar 10</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import EmployeeService from '../services/EmployeeService';
import Employee from '../interfaces/Employee'

const isLoaded = ref(false);
const isOpen = ref(false);
const selectedOption = ref('');
const options = [
  "Todos",
  "UI UX Designer",
  "Graphic Designer",
  "Finance",
  "Project Manager",
  "Creative Director",
  "Lead Designer",
  "IT Support",
  "3D Designer",
  "Web Developer",
  "Data Scientist",
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Quality Assurance",
  "Security Expert",
  "Human Resources",
  "CTO",
  "CFO",
  "COO",
  "CEO",
  "System Administrator",
  "Accountant",
  "Legal Counsel",
  "Marketing Manager",
  "Product Manager",
  "UI/UX Designer",
  "Software Engineer",
  "Data Analyst",
  "Human Resources Manager",
  "Marketing Specialist",
  "Sales Executive",
  "Financial Analyst",
  "Operations Manager"
];


const searchQuery = ref('');
const employeesData = ref<Employee[]>([]);
const displayedEmployees = ref<Employee[][]>([]);
const itemsPerPage = ref<string>('10');
const currentPage = ref(1);
const totalPages = ref(0);

const selectOption = (option: string) => {
  selectedOption.value = option;
  isOpen.value = false;
  performSearch();
};

const calculatePagination = (employees: Employee[]) => {
  displayedEmployees.value = []

  for (let i = 0; i < employees.length; i += Number(itemsPerPage.value)) {
    const chunk = employees.slice(i, i + Number(itemsPerPage.value));
    displayedEmployees.value.push(chunk);
    totalPages.value = displayedEmployees.value.length;
  }
}

const performSearch = () => {
  const filteredData = employeesData.value.filter((employee) =>
    employee.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  if (selectedOption.value === 'Nombre de cargo' || selectedOption.value === "Todos") {
    calculatePagination(filteredData);
  } else {
    const filteredByCargo = filteredData.filter((employee) =>
      employee.cargo.toLowerCase().includes(selectedOption.value.toLowerCase())
    );
    calculatePagination(filteredByCargo);
  }
};

const changePage = (page: number) => {
  if (page < 0 || page > totalPages.value) {
    return;
  }
  currentPage.value = page;
}

watch(itemsPerPage, () => {
  currentPage.value = 1;
  calculatePagination(employeesData.value);
});

onMounted(async () => {
  try {
    const response = await EmployeeService.getEmployees(100);
    employeesData.value = response.data;
    isLoaded.value = true;
    calculatePagination(employeesData.value);
  } catch (error) {
    console.error('Error al cargar los empleados:', error);
  }
});

</script>
