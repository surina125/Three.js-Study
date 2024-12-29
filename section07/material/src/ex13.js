import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// ----- 주제: MeshMatcapMaterial에 효과 더하기

export default function example() {
  // 텍스쳐 이미지 로드
  const loadingManager = new THREE.LoadingManager()
  loadingManager.onStart = () => {
    console.log('로드 시작')
  }
  loadingManager.onProgress = img => {
    console.log(img + ' 로드')
  }
  loadingManager.onLoad = () => {
    console.log('로드 완료')
  }
  loadingManager.onError = () => {
    console.log('에러')
  }

  const textureLoader = new THREE.TextureLoader(loadingManager)
  const baseColorTex = textureLoader.load('/textures/choco/Chocolate_002_basecolor.png')
  const ambientTex = textureLoader.load('/textures/choco/Chocolate_002_ambientOcclusion.png')
  const heightTex = textureLoader.load('/textures/choco/Chocolate_002_height.png')
  const normalTex = textureLoader.load('/textures/choco/Chocolate_002_normal.png')
  const roughnessTex = textureLoader.load('/textures/choco/Chocolate_002_roughness.png')

  // Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();
  // scene.background = new THREE.Color('white')

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5)
  const directionalLight = new THREE.DirectionalLight('white', 1)
  directionalLight.position.set(1, 1, 2)
  scene.add(ambientLight, directionalLight)

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement)

	// Mesh
  const geometry = new THREE.BoxGeometry(3, 3, 3)
  const material = new THREE.MeshStandardMaterial({
    map: baseColorTex,
    roughness: 0.3,
    metalness: 0.3,
    normalMap: normalTex,
    roughnessMap: roughnessTex,
    aoMap: ambientTex,
    aoMapIntensity: 5,
    color: 'green'
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
